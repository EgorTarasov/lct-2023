import { Input } from "@/ui";
import DragDropFile from "@/components/gragAndDrop/index.tsc.tsx";

interface IFile {
  title: string;
  url: string;
  onRemove: () => void;
}

const File = (x: IFile) => {
  return (
    <div
      className={
        "flex items-center justify-between border-b border-text-primary/20 underline py-3"
      }>
      x.title <button onClick={x.onRemove}>x</button>
    </div>
  );
};
export const AdminOnboardingPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <section className="flex flex-col gap-4 mt-4">
        <h1 className={"text-2xl font-medium sm:text-2xl"}>Материалы онбординга</h1>
        <div className={"flex flex-col"}>
          <File title={"test"} url={"test"} onRemove={() => {}} />
          <File title={"test"} url={"test"} onRemove={() => {}} />
          <File title={"test"} url={"test"} onRemove={() => {}} />
          <File title={"test"} url={"test"} onRemove={() => {}} />
        </div>
        <DragDropFile
          onUpload={(data) => console.log(data)}
          acceptableFormats={[".zip"]}
          dropZone={
            <div>
              Перетащите сюда или выберите <b>.zip</b> файл
            </div>
          }
        />
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Онбординг по специальностям</h2>
        <Input placeholder="Поиск по специальностям" />
      </section>
    </div>
  );
};
