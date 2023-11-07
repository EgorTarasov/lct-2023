import { useState } from "react";
import { AssistantSection } from "./sections/assistant.section";
import { MainPageViewModel } from "./main.vm";
import { OnBoardingSection } from "./sections/onboarding.section";
import { EventsSection } from "./sections/events/events.section";
import { CourseSection } from "./sections/course/course.section";
import { observer } from "mobx-react-lite";
import { DiveinSection } from "./sections/divein.section";

const card = "bg-white w-full rounded-2xl sm:p-4";

export const MainPage = observer(() => {
  const [vm] = useState(() => new MainPageViewModel());

  return (
    <div className="flex flex-col gap-4">
      <AssistantSection vm={vm} />
      <div className="flex flex-col gap-4 w-full mx-auto max-w-screen-desktop">
        <div
          className="grid sm:mx-4 gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
          }}>
          <div className={card}>
            <OnBoardingSection vm={vm} />
          </div>
          <div className={card}>
            <CourseSection vm={vm} />
          </div>
        </div>
        <div className={`sm:w-auto sm:mx-4 ${card}`}>
          <DiveinSection vm={vm} />
        </div>
        <div className={`sm:w-auto sm:mx-4 ${card}`}>
          <EventsSection vm={vm} />
        </div>
      </div>
    </div>
  );
});
