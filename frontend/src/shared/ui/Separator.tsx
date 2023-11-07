import { twMerge } from "tailwind-merge";

export const Separator = ({ className }: { className?: string }) => {
  return (
    <span aria-hidden="true" className={twMerge("h-px w-full bg-text-primary/10", className)} />
  );
};
