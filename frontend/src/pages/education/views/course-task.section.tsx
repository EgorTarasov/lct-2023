import { FCVM } from "@/utils/fcvm";
import { observer } from "mobx-react-lite";
import { EducationPageViewModel } from "../education.vm";
import { Button, Checkbox } from "@/ui";
import { useNavigate } from "react-router-dom";
import ChevronIcon from "@/assets/chevron2.svg";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { RadioGroup } from "@headlessui/react";

export const Quiz: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  if (vm.pageState.view !== "courseTask") return null;
  const state = vm.pageState;

  if (!state.quiz.questions) return null;

  const checkAnswers = async () => {
    await vm.checkAnswers();
  };

  return (
    <section className="flex flex-col gap-6 mt-10">
      <h3 className="text-2xl font-medium">Тестирование</h3>
      <ol className="flex flex-col gap-6">
        {state.quiz.questions.map((q, index) => (
          <li key={index} className="flex flex-col">
            <h3 className="text-xl font-medium">Задание {index + 1}</h3>
            <p className="my-2 text-lg">{q.question_text}</p>
            <RadioGroup
              key={index}
              value={state.answers.get(q.id) ?? null}
              onChange={(value) => vm.setAnswer(q.id, value)}
              className="flex flex-col">
              {q.options.map((a, index) => (
                <RadioGroup.Option key={index} value={a.id}>
                  {({ checked }) => (
                    <RadioGroup.Label
                      as="p"
                      className="flex items-center gap-2 cursor-pointer py-3 px-3 text-lg hover:bg-text-primary/5">
                      <Checkbox disabled radio checked={checked} />
                      {a.text}
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </li>
        ))}
      </ol>
      <Button className="w-fit px-8" onClick={checkAnswers}>
        Завершить тестирование
      </Button>
    </section>
  );
});

export const CourseTask: FCVM<EducationPageViewModel> = observer(({ vm }) => {
  const navigate = useNavigate();

  if (vm.pageState.view !== "courseTask") return null;

  const state = vm.pageState;

  return (
    <section className="appear flex flex-col flex-1 max-h-full overflow-hidden">
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
      {/* eslint-disable-next-line prettier/prettier */}
      {state.markdown === "{\"detail\":\"Not Found\"}" ? (
        <div className="flex-1 overflow-y-auto prose mt-6">
          <p className="text-xl">Данная задача пока не доступна ⌛</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto prose mt-6">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{state.markdown}</ReactMarkdown>
        </div>
      )}
      <Quiz vm={vm} />
    </section>
  );
});
