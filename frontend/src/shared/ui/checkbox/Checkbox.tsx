import { FC, useState } from "react";
import { Switch } from "@headlessui/react";
import CheckOn from "@/assets/check-on.svg";
import CheckOff from "@/assets/check-off.svg";

interface CheckboxProps {
  checked: boolean;
  setChecked: (enabled: boolean) => void;
  altText?: string;
  size?: number;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, setChecked, altText, size }) => (
  <Switch checked={checked} onChange={setChecked}>
    {altText && <span className="sr-only">{altText}</span>}
    <span aria-hidden="true">
      {checked ? <CheckOn width={size ?? 24} /> : <CheckOff width={size ?? 24} />}
    </span>
  </Switch>
);
