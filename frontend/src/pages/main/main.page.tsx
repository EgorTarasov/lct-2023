import { useState } from "react";
import { AssistantSection } from "./sections/assistant.section";
import { MainPageViewModel } from "./main.vm";
import { OnBoardingSection } from "./sections/onboarding.section";
import { EventsSection } from "./sections/events/events.section";
import { CourseSection } from "./sections/course/course.section";
import { observer } from "mobx-react-lite";
import { DiveinSection } from "./sections/divein.section";

const card = "bg-white rounded-2xl sm:p-4";

export const MainPage = observer(() => {
  const [vm] = useState(() => new MainPageViewModel());

  return (
    <div className="flex flex-col">
      <AssistantSection vm={vm} />
      <div className="grid sm:grid-cols-2 sm:mx-4 sm:gap-4">
        <div className={card}>
          <OnBoardingSection vm={vm} />
        </div>
        <div className={card}>
          <CourseSection vm={vm} />
        </div>
      </div>
      <DiveinSection vm={vm} />
      <EventsSection vm={vm} />
    </div>
  );
});
