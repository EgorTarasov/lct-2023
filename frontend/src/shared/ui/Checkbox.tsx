import { FC } from "react";
import { Switch } from "@headlessui/react";
import CheckOn from "@/assets/check-on.svg";
import CheckOff from "@/assets/check-off.svg";
import { twMerge } from "tailwind-merge";

interface CheckboxProps {
  checked: boolean;
  setChecked?: (enabled: boolean) => void;
  altText?: string;
  size?: number;
  id?: string;
  className?: string;
  disabled?: boolean;
  ariaHidden?: boolean;
  radio?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  setChecked,
  altText,
  size = 24,
  id,
  className,
  disabled,
  radio,
  ariaHidden = false
}) => (
  <Switch
    disabled={disabled}
    checked={checked}
    onChange={setChecked}
    id={id}
    className={twMerge("text-primary", radio && "rounded-full", className)}
    aria-hidden={ariaHidden ? "true" : "false"}>
    {altText && <span className="sr-only">{altText}</span>}
    <span aria-hidden="true">{checked ? <CheckOn width={size} /> : <CheckOff width={size} />}</span>
  </Switch>
);
