import { FC } from "react";
import { Switch } from "@headlessui/react";
import CheckOn from "@/assets/check-on.svg";
import CheckOff from "@/assets/check-off.svg";

interface CheckboxProps {
  checked: boolean;
  setChecked: (enabled: boolean) => void;
  altText?: string;
  size?: number;
  id?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, setChecked, altText, size, id }) => (
  <Switch checked={checked} onChange={setChecked} id={id}>
    {altText && <span className="sr-only">{altText}</span>}
    <span aria-hidden="true">
      {checked ? <CheckOn width={size ?? 24} /> : <CheckOff width={size ?? 24} />}
    </span>
  </Switch>
);
