import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { TasksPageViewModel } from "../tasks.vm";
import { TaskCard } from "@/components/cards/task-card.widget";

export const TasksSection: FCVM<TasksPageViewModel> = observer(({ vm }) => {
  return (
    <div className="p-4">
      <ul className="flex flex-col gap-3">
        {vm.tasks ? (
          vm.tasks.map((v, i) => <TaskCard key={i} item={v} onFinish={() => vm.finishTask(v.id)} />)
        ) : (
          <p>Нет новых задач!</p>
        )}
      </ul>
    </div>
  );
});
