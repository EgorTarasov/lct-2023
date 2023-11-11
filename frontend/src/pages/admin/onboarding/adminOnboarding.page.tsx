import { Button, Input } from "@/ui";
import DragDropFile from "@/components/dragAndDrop/index.tsc";
import Collapsible from "@/ui/Collapsible.tsx";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile.tsx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AdminOnboardingPageViewModel } from "./adminOnboarding.vm";
import { Link } from "react-router-dom";
import { PositionsSection } from "./positions.section";
import { CourseDto } from "api/models/course.model";

export const AdminTaskCard = ({ file }: { file: CourseDto.CourseFile }) => (
  <li className={"appear flex items-center justify-between border-b border-text-primary/20 py-3"}>
    <a href={`${import.meta.env.VITE_API_URL}/api/${file.path}`} className="underline">
      {file.name}
    </a>
  </li>
);

export const AdminOnboardingPage = observer(() => {
  const [vm] = useState(() => new AdminOnboardingPageViewModel());

  return (
    <div className="flex flex-col px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl mb-7"}>Общий онбординг</h1>
      <Collapsible title={"Файлы общего онбординга"} withoutPadding>
        <ul className="flex flex-col">
          {vm.onboarding?.files.map((course, index) => <AdminTaskCard key={index} file={course} />)}
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
            acceptableFormats={[".docx"]}
            dropZone={
              <div>
                Перетащите сюда или выберите <b>.docx</b> файл
              </div>
            }
          />
        </div>
        {vm.uploadedFiles.length > 0 && (
          <Button
            type="button"
            className="mt-6 px-6 w-60"
            onClick={() => vm.uploadOnboardingFiles()}
            disabled={vm.isLoading}>
            {vm.isLoading ? "Загрузка..." : "Сохранить файлы"}
          </Button>
        )}
      </Collapsible>
      <PositionsSection vm={vm} />
    </div>
  );
});
