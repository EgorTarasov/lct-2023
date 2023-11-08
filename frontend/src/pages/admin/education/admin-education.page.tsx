import { Input } from "@/ui";

export const AdminEducationPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Все образовательные материалы</h1>
      <Input placeholder="Поиск по курсам" />
    </div>
  );
};
