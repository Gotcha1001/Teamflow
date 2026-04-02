import "server-only";

import { headers } from "next/headers";
import { createRouterClient } from "@orpc/server";
import { router } from "@/app/router";
import { request } from "@arcjet/next";

globalThis.$client = createRouterClient(router, {
  context: async () => ({
    request: await request(),
  }),
  // context: async () => ({
  //   request: new Request("http://internal", {
  //     headers: await headers(),
  //   }),
  // }),
});
