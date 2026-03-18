// import { Button } from "@/components/ui/button";
// import { RichTextEditor } from "@/components/ui/rich-text-editor/Editor";
// import { ImageUploadModal } from "@/components/ui/rich-text-editor/ImageUploadModal";
// import { useAttachmentUploadType } from "@/hooks/use-attachment-upload";
// import { ImageIcon, Send } from "lucide-react";
// import { AttachmentChip } from "./message/AttachmentChip";

// interface iAppProps {
//   value: string;
//   onChange: (next: string) => void;
//   onSubmit: () => void;
//   isSubmitting?: boolean;
//   upload: useAttachmentUploadType;
// }
// export function MessageComposer({
//   value,
//   onChange,
//   onSubmit,
//   isSubmitting,
//   upload,
// }: iAppProps) {
//   return (
//     <>
//       <RichTextEditor
//         field={{ value, onChange }}
//         sendButton={
//           <Button
//             disabled={isSubmitting}
//             type="button"
//             size={"sm"}
//             onClick={onSubmit}
//             className="cursor-pointer"
//           >
//             <Send className="size-4 mr-1" />
//             Send
//           </Button>
//         }
//         footerLeft={
//           upload.stagedUrl ? (
//             <AttachmentChip url={upload.stagedUrl} />
//           ) : (
//             <Button
//               type="button"
//               size="sm"
//               variant={"outline"}
//               onClick={() => upload.setOpen(true)}
//               className="cursor-pointer"
//             >
//               <ImageIcon className="size-4 mr-1" />
//               Attach
//             </Button>
//           )
//         }
//       />
//       <ImageUploadModal
//         onUploaded={(url) => upload.onUploaded(url)}
//         open={upload.isOpen}
//         onOpenChange={upload.setOpen}
//       />
//     </>
//   );
// }

// MessageComposer.tsx
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor/Editor";
import { ImageUploadModal } from "@/components/ui/rich-text-editor/ImageUploadModal";
import { useAttachmentUploadType } from "@/hooks/use-attachment-upload";
import { ImageIcon, Send } from "lucide-react";
import { AttachmentChip } from "./message/AttachmentChip";

interface iAppProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  upload: useAttachmentUploadType;
}

export function MessageComposer({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  upload,
}: iAppProps) {
  const handleUploaded = (url: string) => {
    console.log("UploadThing returned:", url); // <-- log the raw value
    upload.onUploaded(url);
  };

  return (
    <>
      <RichTextEditor
        field={{ value, onChange }}
        sendButton={
          <Button
            disabled={isSubmitting}
            type="button"
            size="sm"
            onClick={onSubmit}
            className="cursor-pointer"
          >
            <Send className="size-4 mr-1" />
            Send
          </Button>
        }
        footerLeft={
          upload.stagedUrl ? (
            <>
              {console.log("Rendering AttachmentChip with:", upload.stagedUrl)}
              <AttachmentChip url={upload.stagedUrl} onRemove={upload.clear} />
            </>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => upload.setOpen(true)}
              className="cursor-pointer flex items-center gap-1"
            >
              <ImageIcon className="size-4" />
              Attach
            </Button>
          )
        }
      />
      <ImageUploadModal
        onUploaded={handleUploaded} // log inside handleUploaded
        open={upload.isOpen}
        onOpenChange={upload.setOpen}
      />
    </>
  );
}
