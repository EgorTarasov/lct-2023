import DragDropFile from "@/components/gragAndDrop/index.tsc.tsx";

export const EmployeesPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Добавление сотрудников</h1>
      <section className="flex flex-col gap-4 mt-4">
        <DragDropFile
          onUpload={() => {}}
          acceptableFormats={[".cvc"]}
          dropZone={
            <p>
              Перетащите сюда или выберите <b>.csv</b> файл
            </p>
          }
        />
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Мои сотрудники</h2>
      </section>
    </div>
  );
};
