import { twMerge } from "tailwind-merge";
import ClearSvg from "@/assets/clear.svg";
import React from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary" | "accent";
  onChange?: (text: string) => void;
  error?: boolean;
  allowClear?: boolean;
  icon?: JSX.Element;
  label?: string;
  multiline?: boolean;
}

export const Input: React.FC<InputProps> = ({
  appearance = "primary",
  onChange,
  className,
  error,
  icon,
  allowClear,
  label,
  multiline,
  ...rest
}) => {
  return (
    <div className={twMerge("w-full flex justify-center flex-col gap-1 relative", className)}>
      {label && (
        <label className="text-text-secondary text-sm" htmlFor={rest.id}>
          {label}
        </label>
      )}
      {icon && <div className="absolute left-3 pointer-events-none">{icon}</div>}
      {multiline ? (
        <textarea
          className={twMerge(
            "w-full shadow-none box-border h-40 focus:shadow-md transition-colors duration-200 px-3 py-3 rounded-md border-[1px] border-border-primary placeholder:text-text-secondary text-sm outline-none",
            icon ? "pl-14" : "",
            allowClear ? "pr-12" : "",
            appearance === "primary" ? "bg-input-bg hover:bg-input-hover focus:bg-input-hover" : "",
            error ? "border-status-error" : "",
            rest.disabled ? "bg-input-disabled hover:bg-input-disabled" : ""
          )}
          onChange={(e) => onChange?.(e.target.value)}
          value={rest.value}
          placeholder={rest.placeholder}
          name={rest.name}
        />
      ) : (
        <input
          className={twMerge(
            "w-full shadow-none box-border focus:shadow-md transition-all duration-200 px-3 h-10 rounded-md border-[1px] border-border-primary placeholder:text-text-secondary text-sm outline-none",
            icon ? "pl-10" : "",
            allowClear ? "pr-12" : "",
            appearance === "primary"
              ? "bg-input-bg hover:bg-input-hover focus:bg-input-hover"
              : "bg-bg-primary hover:bg-bg-secondary focus:bg-bg-secondary",
            error ? "border-status-error" : "",
            rest.disabled ? "bg-input-disabled hover:bg-input-disabled" : ""
          )}
          onChange={(e) => onChange?.(e.target.value)}
          {...rest}
        />
      )}
      {allowClear && rest.value && (
        <button
          className="absolute w-5 text-gray-500/50 right-4 focus:outline-none hover:text-gray-500/80"
          onClick={() => onChange?.("")}>
          <ClearSvg />
        </button>
      )}
    </div>
  );
};
