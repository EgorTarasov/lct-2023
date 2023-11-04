import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ className, appearance = "primary", ...rest }) => {
  return (
    <button
      className={twMerge(
        "select-none h-10 w-full rounded-md transition-all px-3 flex items-center justify-center outline-none",
        appearance === "primary"
          ? "bg-button-primary-bg hover:bg-button-primary-hover text-button-primary-text"
          : "bg-button-secondary-bg hover:bg-button-secondary-hover text-button-secondary-text border-border-primary border",
        rest.disabled ? "bg-button-disabled hover:bg-button-disabled text-bg-secondary" : "",
        className
      )}
      {...rest}
    />
  );
};
