import DragDropFile from "@/components/gragAndDrop/index.tsc.tsx";
import { Input } from "@/ui";

export const BrandingPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Данные о брендинге</h1>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Основное</h2>
        <div className="flex gap-4">
          <div className={"flex flex-col w-max align-start"}>
            <label htmlFor={"color-picker"} className={"text-text-primary/50 w-max"}>
              Корпоративный цвет
            </label>
            <input type={"color"} id={"color-picker"} />
            {/*TODO: СДЕЛАТЬ НОРМАЛЬНЫЙ ИНПУТ ЦВЕТОВ*/}
          </div>
          <div className={"flex flex-col w-full"}>
            <label htmlFor={"company-name"} className={"text-text-primary/50"}>
              Название компании
            </label>
            <Input placeholder="Название" title={"Название компании"} id={"company-name"} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Логотип</h2>
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
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Шрифты</h2>
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
    </div>
  );
};
