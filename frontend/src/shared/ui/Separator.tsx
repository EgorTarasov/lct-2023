import { twMerge } from "tailwind-merge";

export const Separator = ({ className }: { className?: string }) => {
  return <span className={twMerge("h-px w-full bg-text-primary/20", className)} />;
};