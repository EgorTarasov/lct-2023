import { Input } from "@/ui";

export const AdminOnboardingPage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Материалы онбординга</h1>
      <section className="flex flex-col gap-4 mt-4">
        <h2 className={"text-2xl font-medium sm:text-2xl"}>Онбординг по специальностям</h2>
        <Input placeholder="Поиск по специальностям" />
      </section>
    </div>
  );
};
