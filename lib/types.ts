import { GroupedReactionSchemaType } from "@/app/schemas/message";
import { Message } from "./generated/prisma/client";

export type MessagelistItem = Message & {
  replyCount: number;
  reactions: GroupedReactionSchemaType[];
};
