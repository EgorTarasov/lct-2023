import { Button, Checkbox, DialogBase } from "@/ui";
import DropdownMultiple from "@/ui/DropdownMultiple";
import { Input } from "@/ui/Input";
import { useState } from "react";
import Chevron from "@/assets/chevron.svg";

export const MainPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>Открыть</Button>
      <DialogBase
        confirmText="Принять"
        isOpen={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
        title="Подтверждение">
        <h1>Вы уверены?</h1>
      </DialogBase>
      <Input errorText="Треш" placeholder="Значение" label="Название" />
      <Checkbox checked={checked} setChecked={setChecked} altText="Поменять режим" />
    </>
  );
};
