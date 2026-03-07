// import type { RouterClient } from "@orpc/server";
// import { RPCLink } from "@orpc/client/fetch";
// import { createORPCClient } from "@orpc/client";
// import { router } from "@/app/router";
// import { createTanstackQueryUtils } from "@orpc/tanstack-query";

// declare global {
//   var $client: RouterClient<typeof router> | undefined;
// }

// const link = new RPCLink({
//   url: () => {
//     if (typeof window === "undefined") {
//       throw new Error("RPCLink is not allowed on the server side.");
//     }

//     return `${window.location.origin}/rpc`;
//   },
// });

// /**
//  * Fallback to client-side client if server-side client is not available.
//  */
// export const client: RouterClient<typeof router> =
//   globalThis.$client ?? createORPCClient(link);

// export const orpc = createTanstackQueryUtils(client);
import type { RouterClient } from "@orpc/server";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCClient } from "@orpc/client";
import { router } from "@/app/router";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

const link = new RPCLink({
  url: () => {
    if (typeof window === "undefined") {
      throw new Error("RPCLink is not allowed on the server side.");
    }
    return `${window.location.origin}/rpc`;
  },
  // ────────────────────────────────────────────────
  // Add this block:
  fetch: (request, init) => {
    return globalThis.fetch(request, {
      ...init,
      credentials: "include", // ← sends cookies (Kinde session) with every request
    });
  },
  // ────────────────────────────────────────────────
});

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
