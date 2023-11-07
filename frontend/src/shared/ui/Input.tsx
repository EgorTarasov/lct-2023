import { twMerge } from "tailwind-merge";
// import ClearSvg from "@/assets/clear.svg"; WTF IS TRIGGERING TS ERROR
import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary";
  onChange?: (text: string) => void;
  error?: boolean;
  errorText?: string | null;
  allowClear?: boolean;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element | false;
  onIconClick?: () => void;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  appearance = "primary",
  onChange,
  className,
  error,
  errorText,
  leftIcon,
  rightIcon,
  onIconClick,
  allowClear,
  label,
  ...rest
}) => (
  <div className={twMerge("w-full flex flex-col max-w-[600px]", className)}>
    {label && (
      <label
        className={twMerge("text-primary/60 mb-2", (error || errorText) && "text-error")}
        htmlFor={rest.id ?? rest.name}>
        {label}
      </label>
    )}
    <div className="w-full group flex relative items-center">
      {leftIcon && <div className="absolute left-3">{leftIcon}</div>}
      <input
        className={twMerge(
          "w-full p-3 h-11",
          "outline-none transition-colors border border-text-primary/20 group-hover:border-text-primary/60 focus:!border-primary rounded-lg", // primary
          (allowClear || rightIcon) && "pr-10",
          leftIcon && "pl-10",
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
          type="button"
          className="absolute w-5 right-3 text-text-primary/60 hover:text-text-primary"
          onClick={() => onChange?.("")}>
          x
        </button>
      )}
      {rightIcon && !allowClear && (
        <button
          type="button"
          onClick={onIconClick}
          aria-hidden={onIconClick ? undefined : true}
          aria-label="Отправить значение поля"
          className="absolute right-1 p-2 w-10 text-text-primary/60 hover:text-text-primary">
          {rightIcon}
        </button>
      )}
    </div>
    {errorText && <span className="text-error mt-1">{errorText}</span>}
  </div>
);
