// Take our JSON and conert it to html

import { baseExtensions } from "@/components/ui/rich-text-editor/extensions";
import { generateHTML, type JSONContent } from "@tiptap/react";

export function convertJsonToHtml(jsonContent: JSONContent): string {
  try {
    const content =
      typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;

    return generateHTML(content, baseExtensions);
  } catch {
    console.log("Error converting josn to html");
    return "";
  }
}
