import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import { Button } from "@/ui";
import { useNavigate } from "react-router-dom";
import ChevronIcon from "@/assets/chevron2.svg";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const CourseTask: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  const navigate = useNavigate();

  if (vm.pageState.view !== "courseTask") return null;

  const state = vm.pageState;

  return (
    <section className="flex flex-col pt-6 flex-1 max-h-full overflow-hidden">
      <Button
        appearance="secondary"
        className="w-fit gap-1 text-text-primary/60 px-2 h-10"
        onClick={() => navigate(`/education/${state.courseId}`)}>
        <ChevronIcon className="w-6 h-6 rotate-180" />
        Назад к курсу
      </Button>
      {/* {state.taskTitle && (
        <h2 className="text-4xl font-medium mt-6 mb-4">{state.taskTitle.replace(".docx", "")}</h2>
      )} */}
      <div className="flex-1 overflow-y-auto prose mt-6">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{state.markdown}</ReactMarkdown>
      </div>
    </section>
  );
});
