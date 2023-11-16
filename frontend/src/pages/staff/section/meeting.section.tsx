import { useEffect, useState } from "react";
import { MeetingViewModel } from "./meeting.vm.ts";
import { Loading } from "@/components/loading/Loading.tsx";
import { observer } from "mobx-react-lite";
import QRCode from "qrcode";

export const MeetingSection = observer(() => {
  const [vm] = useState(() => new MeetingViewModel());
  useEffect(() => {
    if (vm.isQuestionAdded && vm.qrData) {
      console.log(`${import.meta.env.VITE_API_URL}/contacts/${vm.qrData}`);
      QRCode.toCanvas(
        document.getElementById("qr-code"),
        `${import.meta.env.VITE_API_URL}/contacts/${vm.qrData}`,
        {
          width: 256
        }
      );
    }
  }, [vm.isQuestionAdded]);
  if (vm.isLoading) return <Loading />;
  if (!vm.isQuestionAdded)
    return (
      <span className={"px-4"}>
        Чтобы делиться QR кодом нужно сперва добавить вопрос о себе в профиле
      </span>
    );

  return (
    <div className="flex flex-col gap-4 w-full mx-auto max-w-screen-desktop appear px-4 items-center desktop:items-start">
      <span className={"text-text-primary/70"}>
        Дайте вашему коллеге отсканировать QR и ответьте на один вопрос о нём, а мы начислим вам
        баллы!
      </span>
      <canvas id="qr-code" />
    </div>
  );
});
