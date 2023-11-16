import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ className, appearance = "primary", ...rest }) => {
  return (
    <button
      className={twMerge(
        "h-10 w-full rounded-md transition-all flex items-center justify-center",
        appearance === "primary"
          ? "bg-primary hover:brightness-110 text-onPrimary"
          : "border border-text-primary/20 hover:bg-text-primary/5",
        rest.disabled &&
          (appearance === "primary"
            ? "bg-text-primary/20 hover:bg-button-disabled text-text-primary"
            : "!text-text-primary/20 !border-text-primary/5"),
        className
      )}
      {...rest}
    />
  );
};
