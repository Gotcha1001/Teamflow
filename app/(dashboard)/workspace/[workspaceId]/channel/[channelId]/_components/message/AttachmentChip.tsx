// import Image from "next/image";

// interface AttachmentChipProps {
//   url: string;
// }

// export function AttachmentChip({ url }: AttachmentChipProps) {
//   return (
//     <div className="group relative overflow-hidden rounded-md bg-muted">
//       <Image src={url} alt="Attachment" fill />
//     </div>
//   );
// }
// AttachmentChip.tsx
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface AttachmentChipProps {
  url?: string; // optional to allow undefined
  onRemove: () => void;
}

export function AttachmentChip({ url, onRemove }: AttachmentChipProps) {
  // only render if url is a valid non-empty string
  if (!url || url.trim() === "") return null;

  return (
    <div className="group relative overflow-hidden rounded-md bg-muted w-24 h-24 size-12">
      <Image src={url} alt="Attachment" fill className="object-cover" />
      <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/30 group-hover:opacity-100">
        <Button
          onClick={onRemove}
          type="button"
          variant="destructive"
          className="size-6 p-0 rounded-full"
        >
          <X className="size-3" />
        </Button>
      </div>
    </div>
  );
}
