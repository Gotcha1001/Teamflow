import { Message } from "./generated/prisma/client";

export type MessagelistItem = Message & {
  repliesCount: number;
};
