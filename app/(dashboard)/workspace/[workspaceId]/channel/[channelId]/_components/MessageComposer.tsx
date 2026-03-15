import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor/Editor";
import { ImageIcon, Send } from "lucide-react";

interface iAppProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}
export function MessageComposer({
  value,
  onChange,
  onSubmit,
  isSubmitting,
}: iAppProps) {
  return (
    <>
      <RichTextEditor
        field={{ value, onChange }}
        sendButton={
          <Button
            disabled={isSubmitting}
            type="button"
            size={"sm"}
            onClick={onSubmit}
            className="cursor-pointer"
          >
            <Send className="size-4 mr-1" />
            Send
          </Button>
        }
        footerLeft={
          <Button
            type="button"
            size="sm"
            variant={"outline"}
            onClick={onSubmit}
            className="cursor-pointer"
          >
            <ImageIcon className="size-4 mr-1" />
            Attach
          </Button>
        }
      />
    </>
  );
}
