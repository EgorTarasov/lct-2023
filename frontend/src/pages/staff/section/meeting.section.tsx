import { useState } from "react";
import { MeetingViewModel } from "./meeting.vm.ts";
import { Loading } from "@/components/loading/Loading.tsx";

export const MeetingSection = () => {
  const [vm] = useState(() => new MeetingViewModel());
  if (vm.isLoading) return <Loading />;

  return <>JR</>;
};
