import { twMerge } from "tailwind-merge";
import ClearSvg from "@/assets/clear.svg";
import React from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary";
  onChange?: (text: string) => void;
  error?: boolean;
  allowClear?: boolean;
  icon?: JSX.Element;
  label?: string;
}

export const OldInput: React.FC<InputProps> = ({
  appearance = "primary",
  onChange,
  className,
  error,
  icon,
  allowClear,
  label,
  ...rest
}) => {
  return (
    <div className={twMerge("w-full flex flex-col gap-1 relative", className)}>
      {label && (
        <label className={twMerge("font-medium text-sm", error && "text-error")} htmlFor={rest.id}>
          {label}
        </label>
      )}
      {icon && <div className="absolute left-3 pointer-events-none">{icon}</div>}
      <input
        className={twMerge(
          "w-full px-3 py-1.5",
          "bg-input-bg hover:bg-input-hover focus:bg-input-hover", // primary
          icon ? "pl-10" : "",
          allowClear && "pr-12",
          error && "border-error",
          rest.disabled ? "bg-input-disabled hover:bg-input-disabled" : ""
        )}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
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
