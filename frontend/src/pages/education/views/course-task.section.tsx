import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";

export const CourseTask: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  return <>CourseTask</>;
});
