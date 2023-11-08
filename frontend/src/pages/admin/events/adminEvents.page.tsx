import { Input } from "@/ui";

export const AdminEventsPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-xl font-medium sm:text-2xl"}>Все мероприятия</h1>
      <Input placeholder="Поиск по мероприятиям" />
    </div>
  );
};
