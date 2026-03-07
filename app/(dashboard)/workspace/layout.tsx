// import React, { ReactNode } from "react";
// import { WorkspaceList } from "./_components/WorkspaceList";
// import { CreateWorkspace } from "./_components/CreateWorkspace";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { UserNav } from "./_components/UserNav";

// import { orpc } from "@/lib/orpc";
// import { getQueryClient, HydrateClient } from "@/lib/query/hydration";

// const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
//   const queryClient = getQueryClient();

//   return (
//     <div className="flex w-full h-screen">
//       <TooltipProvider>
//         <div className="flex h-full w-16 flex-col items-center bg-secondary border-r border-border">
//           <HydrateClient client={queryClient}>
//             <WorkspaceList />
//           </HydrateClient>

//           <div className="mt-4">
//             <CreateWorkspace />
//           </div>
//           <div className="mt-auto">
//             <HydrateClient client={queryClient}>
//               <UserNav />
//             </HydrateClient>
//           </div>
//         </div>
//       </TooltipProvider>
//       {children}
//     </div>
//   );
// };

// export default WorkspaceLayout;

import React, { ReactNode } from "react";
import { WorkspaceList } from "./_components/WorkspaceList";
import { CreateWorkspace } from "./_components/CreateWorkspace";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserNav } from "./_components/UserNav";

import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";

const WorkspaceLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  // Prefetch the shared workspace list data on the server
  // This runs during SSR → data is available immediately after hydration
  await queryClient.prefetchQuery(orpc.workspace.list.queryOptions());
  console.log(
    "Prefetched workspace list:",
    queryClient.getQueryData(orpc.workspace.list.queryKey()),
  );

  // You could prefetch more queries here if needed in the future
  // await queryClient.prefetchQuery(orpc.user.profile.queryOptions());
  // etc.

  return (
    <div className="flex w-full h-screen">
      <TooltipProvider>
        {/* Wrap the entire sidebar content in ONE HydrateClient */}
        {/* This way both WorkspaceList and UserNav share the hydrated cache */}
        <HydrateClient client={queryClient}>
          <div className="flex h-full w-16 flex-col items-center bg-secondary border-r border-border">
            <WorkspaceList />

            <div className="mt-4">
              <CreateWorkspace />
            </div>

            <div className="mt-auto">
              <UserNav />
            </div>
          </div>
        </HydrateClient>
      </TooltipProvider>

      {children}
    </div>
  );
};

export default WorkspaceLayout;
