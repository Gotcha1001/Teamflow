// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { orpc } from "@/lib/orpc";
// import { cn } from "@/lib/utils";
// import { useSuspenseQuery } from "@tanstack/react-query";

// const colorCombinations = [
//   "bg-blue-500 hover:bg-blue-600 text-white",
//   "bg-emerald-500 hover:bg-emerald-600 text-white",
//   "bg-purple-500 hover:bg-purple-600 text-white",
//   "bg-amber-500 hover:bg-amber-600 text-white",
//   "bg-rose-500 hover:bg-rose-600 text-white",
//   "bg-indigo-500 hover:bg-indigo-600 text-white",
//   "bg-cyan-500 hover:bg-cyan-600 text-white",
//   "bg-pink-500 hover:bg-pink-600 text-white",
// ];

// const getWorkspaceColor = (id: string) => {
//   const charSum = id
//     .split("")
//     .reduce((sum, char) => sum + char.charCodeAt(0), 0);

//   const colorIndex = charSum % colorCombinations.length;

//   return colorCombinations[colorIndex];
// };

// export function WorkspaceList() {
//   const {
//     data: { workspaces, currentWorkspace },
//   } = useSuspenseQuery(orpc.workspace.list.queryOptions());
//   return (
//     <TooltipProvider>
//       <div className="flex flex-col gap-2">
//         {workspaces.map((space) => {
//           const isActive = currentWorkspace.orgCode === space.id;
//           return (
//             <Tooltip key={space.id}>
//               <TooltipTrigger asChild>
//                 <Button
//                   size={"icon"}
//                   className={cn(
//                     "size-12 transition-all duration-200",
//                     getWorkspaceColor(space.id),
//                     isActive ? "rounded-lg" : "rounded-xl hover:rounded-lg",
//                   )}
//                 >
//                   <span className="text-sm font-semibold">{space.avatar}</span>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent side="right">
//                 <p>
//                   {space.name} {isActive && "(Current)"}
//                 </p>
//               </TooltipContent>
//             </Tooltip>
//           );
//         })}
//       </div>
//     </TooltipProvider>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const colorCombinations = [
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-amber-500 hover:bg-amber-600 text-white",
  "bg-rose-500 hover:bg-rose-600 text-white",
  "bg-indigo-500 hover:bg-indigo-600 text-white",
  "bg-cyan-500 hover:bg-cyan-600 text-white",
  "bg-pink-500 hover:bg-pink-600 text-white",
];

const getWorkspaceColor = (id: string) => {
  const charSum = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const colorIndex = charSum % colorCombinations.length;

  return colorCombinations[colorIndex];
};

export function WorkspaceList() {
  const query = useQuery(
    orpc.workspace.list.queryOptions({
      // or add: suspense: false,  // if still using useSuspenseQuery
    }),
  );

  if (query.isLoading) return <div>Loading workspaces...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  const { workspaces, currentWorkspace } = query.data ?? {
    workspaces: [],
    currentWorkspace: null,
  };
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {workspaces.map((space) => {
          const isActive = currentWorkspace?.orgCode === space.id;
          return (
            <Tooltip key={space.id}>
              <TooltipTrigger asChild>
                <LoginLink orgCode={space.id}>
                  <Button
                    size={"icon"}
                    className={cn(
                      "size-12 transition-all duration-200",
                      getWorkspaceColor(space.id),
                      isActive ? "rounded-lg" : "rounded-xl hover:rounded-lg",
                    )}
                  >
                    <span className="text-sm font-semibold">
                      {space.avatar}
                    </span>
                  </Button>
                </LoginLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>
                  {space.name} {isActive && "(Current)"}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
