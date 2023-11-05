import { FC, HTMLProps, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: React.FC<HTMLProps<SVGElement>>;
};

export const IconButton: FC<IconButtonProps> = ({ className, icon: Icon, ...rest }) => {
  return (
    <button
      className={twMerge(
        "w-8 h-8 flex items-center justify-center text-text-primary/60 hover:text-text-primary transition-colors cursor-pointer border border-text-primary/20 rounded-lg",
        className
      )}
      {...rest}>
      <Icon />
    </button>
  );
};
