import { Button } from "@/ui";
import { useState } from "react";
import { AnalyticsViewModel } from "./analytics.vm.ts";
import { GraphSection } from "./graph.section.tsx";
import { observer } from "mobx-react-lite";

export const AnalyticsPage = observer(() => {
  const [vm] = useState(() => new AnalyticsViewModel());

  return (
    <div className="flex flex-col gap-4 px-4 mx-auto mt-6 max-w-screen-desktop fade-enter-done sm:mt-10">
      <h1 className={"text-2xl font-medium sm:text-2xl"}>Аналитика</h1>
      <section className="flex flex-col gap-4 mt-4">
        <p>Чтобы ознакомиться с аналитикой, выгрузите данные о сотрудниках из сервиса </p>
        <Button
          className={"max-w-[512px]"}
          onClick={() => vm.getAllData()}
          disabled={vm.isAllDataLoading}>
          {vm.isAllDataLoading ? "Загрузка..." : "Выгрузить все данные"}
        </Button>
        <Button
          className={"max-w-[512px]"}
          onClick={() => vm.getOnboardingData()}
          disabled={vm.isOnboardingDataLoading}>
          {vm.isOnboardingDataLoading ? "Загрузка..." : "Выгрузить данные об онбординге"}
        </Button>
      </section>
      <div className="mt-4">
        <GraphSection vm={vm} />
      </div>
    </div>
  );
});
