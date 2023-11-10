import { Input } from "@/ui";
import DragDropFile from "@/components/dragAndDrop/index.tsc";
import Collapsible from "@/ui/Collapsible.tsx";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile.tsx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AdminOnboardingPageViewModel } from "./adminOnboarding.vm";

export const AdminOnboardingPage = observer(() => {
  const [vm] = useState(() => new AdminOnboardingPageViewModel());

  return (
    <div className="flex flex-col px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Общий онбординг</h1>
      <Collapsible title={"Файлы общего онбординга"} withoutPadding>
        <div className="flex flex-col">
          {vm.uploadedFiles.map((file, index) => (
            <UploadedFile
              key={index}
              title={file.name}
              onRemove={() => vm.removeFile(file)}
              fileSize={file.size}
            />
          ))}
        </div>
        <div className="mt-6">
          <DragDropFile
            onUpload={(files) => vm.addFiles(files)}
            acceptableFormats={[".zip"]}
            dropZone={
              <div>
                Перетащите сюда или выберите <b>.zip</b> файл
              </div>
            }
          />
        </div>
      </Collapsible>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Онбординг по специальностям</h2>
        <Input placeholder="Поиск по специальностям" />
      </section>
    </div>
  );
});
