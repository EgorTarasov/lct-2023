import { Tabs } from "@/ui/Tabs.tsx";
import SearchIcon from "@/assets/search.svg";
import { Button, DialogBase, Input } from "@/ui";
import { useEffect, useState } from "react";
import { ContactListSection } from "./section/contactList.section.tsx";
import { MeetingSection } from "./section/meeting.section.tsx";
import { StaffViewModel } from "./section/staff.vm.ts";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { twMerge } from "tailwind-merge";

export const StaffPage = observer(() => {
  const [vm] = useState(() => new StaffViewModel());
  const params = useParams();
  const [search, setSearch] = useState("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (params.uid) {
      vm.surveyToken = params.uid;
      vm.getSurveyByUid(params.uid);
    }
  }, []);
  const handleClearSurvey = () => {
    vm.survey = null;
    vm.surveyToken = null;
    window.history.replaceState(null, "", "/contacts");
  };

  return (
    <>
      <div className="py-6 mt-4 flex flex-col gap-4 mx-auto max-w-screen-desktop">
        <Input
          id={"search"}
          placeholder={"Поиск"}
          rightIcon={<SearchIcon />}
          className="px-4"
          value={search}
          onChange={setSearch}
        />
        <Tabs
          tabs={[
            {
              title: "Контакты",
              element: <ContactListSection />
            },
            {
              title: "Знакомства",
              element: <MeetingSection />
            }
          ]}
        />
      </div>
      <DialogBase
        isOpen={vm.survey !== null}
        width={555}
        title="Новый контакт"
        onCancel={handleClearSurvey}
        confirmText="Добавить образовательный материал">
        <div className="flex flex-col gap-4">
          <span className={"font-medium"}>
            {vm.survey?.first_name} {vm.survey?.last_name} ваш новый контакт!
          </span>
          <div className="flex flex-col gap-2">
            <span>Он задал вам вопрос:</span>
            <span>«{vm.survey?.fact.question}»</span>
          </div>
          <span
            className={twMerge(
              "font-medium",
              vm.isValid !== null && vm.isValid ? "text-green-500" : "text-red-500"
            )}>
            {vm.isValid !== null
              ? vm.isValid
                ? "Вы ответили правильно!"
                : "Вы ответили неправильно!"
              : ""}
          </span>
          <Input placeholder={"Ответ"} onChange={setAnswer} value={answer} />
          <Button
            onClick={() =>
              vm.isValid !== null && vm.isValid ? handleClearSurvey() : vm.checkValidAnswer(answer)
            }>
            {vm.isValid !== null && vm.isValid ? "Закрыть" : "Ответить"}
          </Button>
        </div>
      </DialogBase>
    </>
  );
});
