import { twMerge } from "tailwind-merge";
// import ClearSvg from "@/assets/clear.svg"; WTF IS TRIGGERING TS ERROR
import React from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary";
  onChange?: (text: string) => void;
  error?: boolean;
  errorText?: string | null;
  allowClear?: boolean;
  icon?: JSX.Element;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  appearance = "primary",
  onChange,
  className,
  error,
  errorText,
  icon,
  allowClear,
  label,
  ...rest
}) => (
  <div className={twMerge("w-full flex flex-col", className)}>
    {label && (
      <label
        className={twMerge("text-primary/60 mb-2", (error || errorText) && "text-error")}
        htmlFor={rest.id ?? rest.name}>
        {label}
      </label>
    )}
    <div className="w-full group flex relative items-center">
      <input
        className={twMerge(
          "w-full p-3",
          "outline-none transition-colors border border-text-primary/20 group-hover:border-text-primary/60 focus:border-primary rounded-lg", // primary
          (allowClear || icon) && "pr-10",
          (error || errorText) && "border-error",
          rest.disabled
            ? "bg-text-primary/5 group-hover:bg-text-primary/5 text-text-primary/20"
            : ""
        )}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      {allowClear && rest.value && !rest.disabled && (
        <button
          className="absolute w-5 right-3 text-text-primary/60 hover:text-text-primary"
          onClick={() => onChange?.("")}>
          x
        </button>
      )}
      {icon && !allowClear && (
        <button className="absolute right-1 p-2 w-10 text-text-primary/60 hover:text-text-primary">
          {icon}
        </button>
      )}
    </div>
    {errorText && <span className="text-error mt-1">{errorText}</span>}
  </div>
);