import { Button, Checkbox, DialogBase } from "@/ui";
import { Input } from "@/ui/Input";
import { useState } from "react";
import Collapsible from "@/ui/Collapsible.tsx";
import { AssistantSection } from "./sections/assistant.section";
import { MainPageViewModel } from "./main.vm";
import { OnBoardingSection } from "./sections/onboarding.section";
import { EventsSection } from "./sections/events/events.section";
import { CourseSection } from "./sections/course/course.section";
import { observer } from "mobx-react-lite";

export const MainPage = observer(() => {
  const [vm] = useState(() => new MainPageViewModel());

  return (
    <div className="flex flex-col">
      <AssistantSection vm={vm} />
      <OnBoardingSection vm={vm} />
      <EventsSection vm={vm} />
      <CourseSection vm={vm} />
    </div>
  );
});
