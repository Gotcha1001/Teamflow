import {
  ChannelEvent,
  ChannelEventSchema,
  RealtimeMessage,
} from "@/app/schemas/realtime";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import usePartySocket from "partysocket/react";
import { createContext, ReactNode, useContext, useMemo } from "react";

type ChannelRealtimeContextValue = {
  send: (event: ChannelEvent) => void;
};

interface ChannelReatimeProviderProps {
  channelId: string;
  children: ReactNode;
}

type MessageListPage = { items: RealtimeMessage[]; nextCursor?: string };
type InfiniteMessages = InfiniteData<MessageListPage>;

const ChannelRealtimeContext =
  createContext<ChannelRealtimeContextValue | null>(null);

export function ChannelRealtimeProvider({
  channelId,
  children,
}: ChannelReatimeProviderProps) {
  const queryClient = useQueryClient();
  const socket = usePartySocket({
    host: "https://teamflow-chat-realtime.wesleyolivier443.workers.dev",
    room: `channel-${channelId}`,
    party: "chat",
    onMessage(e) {
      try {
        const parsed = JSON.parse(e.data);

        const result = ChannelEventSchema.safeParse(parsed);

        if (!result.success) {
          console.warn("Invalid channel event");
          return;
        }

        const event = result.data;

        console.log(event);

        if (event.type === "message:created") {
          const raw = event.payload.message;

          // Insert at the top of the first page of the infinite list for the channel
          queryClient.setQueryData<InfiniteMessages>(
            ["message.list", channelId],
            (old) => {
              if (!old) {
                return {
                  pages: [{ items: [raw], nextCursor: undefined }],
                  pageParams: [undefined],
                } as InfiniteMessages;
              }

              const first = old.pages[0];
              const updatedFirst: MessageListPage = {
                ...first,
                items: [raw, ...first.items],
              };
              return { ...old, pages: [updatedFirst, ...old.pages.slice(1)] };
            },
          );
          return;
        }
        if (event.type === "message:updated") {
          const updated = event.payload.message;

          // Replace the message in the infinite list by id
          queryClient.setQueryData<InfiniteMessages>(
            ["mesage.list", channelId],
            (old) => {
              if (!old) return old;

              const pages = old.pages.map((p) => ({
                ...p,
                items: p.items.map((m) =>
                  m.id === updated.id ? { ...m, ...updated } : m,
                ),
              }));
              return { ...old, pages };
            },
          );
          return;
        }

        if (event.type === "reaction:updated") {
          const { messageId, reactions } = event.payload;

          queryClient.setQueryData<InfiniteMessages>(
            ["message.list", channelId],
            (old) => {
              if (!old) return old;

              const pages = old.pages.map((p) => ({
                ...p,
                items: p.items.map((m) =>
                  m.id === messageId ? { ...m, reactions } : m,
                ),
              }));
              return { ...old, pages };
            },
          );
          return;
        }

        if (event.type === "message:replies:increment") {
          const { messageId, delta } = event.payload;

          queryClient.setQueryData<InfiniteMessages>(
            ["message.list", channelId],
            (old) => {
              if (!old) return old;

              const pages = old.pages.map((p) => ({
                ...p,
                items: p.items.map((m) =>
                  m.id === messageId
                    ? {
                        ...m,
                        replyCount: Math.max(
                          0,
                          Number(m.replyCount ?? 0) + Number(delta),
                        ),
                      }
                    : m,
                ),
              }));
              return { ...old, pages };
            },
          );
          return;
        }
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    },
  });

  const value = useMemo<ChannelRealtimeContextValue>(() => {
    return {
      send: (event) => {
        socket.send(JSON.stringify(event));
      },
    };
  }, [socket]);

  return (
    <ChannelRealtimeContext.Provider value={value}>
      {children}
    </ChannelRealtimeContext.Provider>
  );
}

export function useChannelRealtime(): ChannelRealtimeContextValue {
  const ctx = useContext(ChannelRealtimeContext);

  if (!ctx) {
    throw new Error(
      "useChannelRealtime must be used within a ChannelRealtimeProvider",
    );
  }
  return ctx;
}
