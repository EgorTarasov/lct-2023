import { Button, DialogBase } from "@/ui";
import { useState } from "react";

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
    </>
  );
};
