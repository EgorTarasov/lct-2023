import { Button } from "@/ui";

export const AnalyticsPage = () => {
  const getAllData = () => {};
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Аналитика</h1>
      <section className="flex flex-col gap-4 mt-4">
        <p>Чтобы ознакомиться с аналитикой, выгрузите данные о сотрудниках из сервиса </p>
        <Button className={"max-w-[256px]"}>Выгрузить все данные</Button>
      </section>
    </div>
  );
};
