import { type JSONContent } from "@tiptap/react";
import { convertJsonToHtml } from "@/lib/json-to-html";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface iAppProps {
  content: JSONContent;
  className?: string;
}

export function SafeContent({ content, className }: iAppProps) {
  const html = convertJsonToHtml(content);

  const clean = DOMPurify.sanitize(html);

  return <div className={className}>{parse(clean)}</div>;
}

// components/rich-text-editor/SafeContent.tsx

// import { type JSONContent } from "@tiptap/react";
// import { convertJsonToHtml } from "@/lib/json-to-html";
// import DOMPurify from "dompurify";
// import parse from "html-react-parser";

// interface iAppProps {
//   content: JSONContent | string | null | undefined; // ← made more flexible
//   className?: string;
// }

// export function SafeContent({ content, className = "" }: iAppProps) {
//   if (!content) {
//     return <div className={className} />;
//   }

//   let html = "";

//   try {
//     // Handle string content (what comes from DB)
//     let jsonContent: JSONContent;

//     if (typeof content === "string") {
//       const trimmed = content.trim();
//       if (trimmed === "" || trimmed === "null" || trimmed === "undefined") {
//         html = ""; // empty message (e.g. image-only)
//       } else {
//         jsonContent = JSON.parse(trimmed);
//         html = convertJsonToHtml(jsonContent);
//       }
//     } else {
//       // Already a JSONContent object
//       html = convertJsonToHtml(content);
//     }
//   } catch (error) {
//     console.warn("SafeContent: Failed to parse message content:", content);
//     // Fallback: treat as plain text so the message doesn't completely break
//     html = `<p>${String(content).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`;
//   }

//   const clean = DOMPurify.sanitize(html);

//   return <div className={className}>{parse(clean)}</div>;
// }
