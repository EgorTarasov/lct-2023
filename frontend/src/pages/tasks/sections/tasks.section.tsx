import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { TasksPageViewModel } from "../tasks.vm";

export const TasksSection: FCVM<TasksPageViewModel> = observer(({ vm }) => {
  return <>TasksSection</>;
});
