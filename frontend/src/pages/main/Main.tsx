import { Button, DialogBase } from "@/ui";
import DropdownMultiple from "@/ui/DropdownMultiple";
import { OldInput } from "@/ui/OldInput";
import { useState } from "react";
import Chevron from "@/assets/chevron.svg";

export const MainPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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
      <OldInput errorText="Треш" icon={<Chevron />} placeholder="Значение" label="Название" />
    </>
  );
};
