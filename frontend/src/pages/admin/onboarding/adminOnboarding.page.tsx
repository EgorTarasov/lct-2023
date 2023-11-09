import { Input } from "@/ui";
import DragDropFile from "@/components/gragAndDrop/index.tsc.tsx";
import Collapsible from "@/ui/Collapsible.tsx";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile.tsx";

const MocFiles = [
  {
    title: "test",
    url: "test"
  },
  {
    title: "test 2",
    url: "test"
  },
  {
    title: "test 3",
    url: "test"
  },
  {
    title: "test 4",
    url: "test"
  }
];
export const AdminOnboardingPage = () => {
  return (
    <div className="flex flex-col px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Материалы онбординга</h1>
      <Collapsible title={"Файлы общего онбординга"} withoutPadding>
        <div className="flex flex-col">
          {MocFiles.map((file, index) => (
            <UploadedFile title={file.title} url={file.url} key={index} onRemove={() => {}} />
          ))}
        </div>
        <div className="mt-6">
          <DragDropFile
            onUpload={(data) => console.log(data)}
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
};
