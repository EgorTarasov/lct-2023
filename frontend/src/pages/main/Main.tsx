import { Button, Checkbox, DialogBase } from "@/ui";
import { Input } from "@/ui/Input";
import { useState } from "react";
import Collapsible from "@/ui/Collapsible.tsx";

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
      <Collapsible title="Список">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="reals">Посмотреть рилсы</label>
            <Checkbox
              checked={checked}
              setChecked={setChecked}
              altText="Посомтреть рилсы"
              id="reals"
            />
          </div>
        </div>
      </Collapsible>
    </>
  );
};
