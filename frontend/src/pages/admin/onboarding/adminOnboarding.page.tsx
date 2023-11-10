import { Input } from "@/ui";
import DragDropFile from "@/components/dragAndDrop/index.tsc";
import Collapsible from "@/ui/Collapsible.tsx";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile.tsx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AdminOnboardingPageViewModel } from "./adminOnboarding.vm";
import { Link } from "react-router-dom";

export const AdminOnboardingPage = observer(() => {
  const [vm] = useState(() => new AdminOnboardingPageViewModel());

  return (
    <div className="flex flex-col px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl mb-7"}>Общий онбординг</h1>
      <Collapsible title={"Файлы общего онбординга"} withoutPadding>
        <ul className="flex flex-col">
          {vm.onboarding?.files.map((course, index) => (
            <li
              key={index}
              className={"flex items-center justify-between border-b border-text-primary/20 py-3"}>
              <a href={import.meta.env.VITE_API_URL + course.path} className="underline">
                {course.name}
              </a>
            </li>
          ))}
          {vm.uploadedFiles.map((file, index) => (
            <UploadedFile
              key={index}
              title={file.name}
              onRemove={() => vm.removeFile(file)}
              fileSize={file.size}
            />
          ))}
        </ul>
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
