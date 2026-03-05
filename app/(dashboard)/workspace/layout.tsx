import React, { ReactNode } from "react";
import { WorkspaceList } from "./_components/WorkspaceList";
import { CreateWorkspace } from "./_components/CreateWorkspace";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserNav } from "./_components/UserNav";

const WorkspaceLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <TooltipProvider>
        <div className="flex h-full w-16 flex-col items-center bg-secondary border-r border-border">
          <WorkspaceList />
          <div className="mt-4">
            <CreateWorkspace />
          </div>
          <div className="mt-auto">
            <UserNav />
          </div>
        </div>
      </TooltipProvider>
      {children}
    </div>
  );
};

export default WorkspaceLayout;
