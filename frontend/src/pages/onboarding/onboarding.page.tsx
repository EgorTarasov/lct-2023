import Collapsible from "@/ui/Collapsible";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { OnboardingPageViewModel } from "./onboarding.vm";
import { Loading } from "@/components/loading/Loading";
import { TaskLink } from "../education/views/course.section";

export const OnboardingPage = observer(() => {
  const [vm] = useState(() => new OnboardingPageViewModel());

  return (
    <div className="flex flex-col gap-4 sm:px-4 mx-auto max-w-screen-desktop">
      <div className="flex justify-between pt-6">
        <h2 className="text-4xl font-medium">Мой онбординг</h2>
        <span className="text-primary text-2xl"></span>
      </div>
      {vm.isLoading ? (
        <Loading />
      ) : vm.course === null ? (
        <div className="flex justify-center items-center w-full h-48">
          <p className="text-2xl text-center">Скоро здесь появится курс, подожди еще немного!</p>
        </div>
      ) : (
        <ul className="p-5 bg-white flex flex-col rounded-2xl">
          <Collapsible title={vm.course.title}>
            {vm.course.files.map((file, index) => (
              <TaskLink key={index} courseId={vm.course!.id} item={file} />
            ))}
          </Collapsible>
        </ul>
      )}
    </div>
  );
});
