import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export const IconText = ({
  icon: Icon,
  text,
  alt,
  iconPrimary,
  className
}: {
  icon: React.FC<HTMLProps<SVGElement>>;
  text: string;
  alt: string;
  iconPrimary?: boolean;
  className?: string;
}) => (
  <li className="flex" aria-label={`${alt}: ${text}`}>
    <Icon
      className={twMerge(
        "min-w-[16px]",
        iconPrimary ? "text-primary" : "text-text-primary/60",
        className
      )}
      aria-hidden="true"
      width={16}
      height={16}
    />
    <span className="ml-1 text-sm leading-none mt-[1px]" aria-hidden="true">
      {text}
    </span>
  </li>
);
