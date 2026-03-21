import { Cloud, PlusCircle } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <Empty className="border border-dashed hover:bg-radial from-purple-500 to-indigo-900">
      <EmptyHeader>
        <EmptyMedia
          variant={"icon"}
          className="bg-radial from-purple-500 to-indigo-900"
        >
          <Cloud className="size-5 text-primary" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={href} className={buttonVariants()}>
          <PlusCircle />
          {buttonText}
        </Link>
      </EmptyContent>
    </Empty>
  );
}
