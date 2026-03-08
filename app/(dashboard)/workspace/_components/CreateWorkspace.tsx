"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workspaceSchema, WorkspaceSchemaType } from "@/app/schemas/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { isDefinedError } from "@orpc/client";

export function CreateWorkspace() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const createWorkspaceMutation = useMutation(
    orpc.workspace.create.mutationOptions({
      onMutate: (values) => {
        // Optional: log right before sending the request
        console.log("[CreateWorkspace] Starting mutation with values:", values);
      },

      onSuccess: (newWorkspace, variables) => {
        console.log("[CreateWorkspace] Success! New workspace:", newWorkspace);
        toast.success(
          `Workspace "${newWorkspace.workspaceName}" created successfully`,
        );

        queryClient.invalidateQueries({
          queryKey: orpc.workspace.list.queryKey(),
        });

        form.reset();
        setOpen(false);
      },

      onError: (error, variables) => {
        // ────────────────────────────────────────────────
        // This is the most important log right now
        console.error("[CreateWorkspace] Mutation failed:", {
          error,
          errorMessage: error?.message,
          errorName: error?.name,
          // If ORPC error has shape like { code, message, data }
          fullError: JSON.stringify(error, null, 2), // pretty-print the whole object
        });
        // ────────────────────────────────────────────────
        if (isDefinedError(error)) {
          if (error.code === "RATE_LIMITED") {
            toast.error(error.message);
            return;
          }
          toast.error(error.message);
          return;
        }
        toast.error("Failed to create workspace, try again");
      },

      // Optional: runs always (success or error)
      onSettled: (data, error) => {
        console.log("[CreateWorkspace] Mutation settled:", { data, error });
      },
    }),
  );

  function onSubmit(values: WorkspaceSchemaType) {
    console.log("[CreateWorkspace] Form submitted with:", values);
    createWorkspaceMutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              size="icon"
              className="border-2 border-dashed rounded-xl size-12 border-muted-foreground/50 text-muted-foreground hover:border-muted-foreground hover:text-foreground hover:rounded-lg transition-all duration-200"
            >
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Create Workspace</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to get started
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormControl>
                      <Input placeholder="My Workspace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button disabled={createWorkspaceMutation.isPending} type="submit">
              {createWorkspaceMutation.isPending
                ? "Creating..."
                : "Create Workspace"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
