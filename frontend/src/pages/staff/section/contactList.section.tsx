import Collapsible from "@/ui/Collapsible.tsx";
import { MocStaff } from "api/models/staff.model.ts";
import { StaffCard } from "../components/StaffCard.tsx";

export const ContactListSection = () => {
  return (
    <Collapsible title={"Моя команда"}>
      <div className="flex flex-col gap-4 px-4 py-6">
        {MocStaff.map((v) => (
          <StaffCard key={v.id} {...v} />
        ))}
      </div>
    </Collapsible>
  );
};
