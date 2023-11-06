import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TasksPageViewModel } from "./tasks.vm";
import { HeaderSection } from "./sections/header.section";
import { Tabs } from "@/ui/Tabs";
import { ProgramSection } from "./sections/program.section";
import { TasksSection } from "./sections/tasks.section";

export const TasksPage = observer(() => {
  const [vm] = useState(() => new TasksPageViewModel());
  return (
    <div className="flex flex-col">
      <HeaderSection />
      <Tabs
        className="mt-3"
        tabs={[
          {
            title: "Мои задачи",
            element: <TasksSection vm={vm} />
          },
          {
            title: "Моя программа",
            element: <ProgramSection vm={vm} />
          }
        ]}
      />
    </div>
  );
});
