import Collapsible from "@/ui/Collapsible.tsx";
import { MocStaff } from "api/models/staff.model.ts";
import { StaffCard } from "../components/StaffCard.tsx";

export const ContactListSection = () => {
  return (
    <Collapsible title={"Моя команда"}>
      <div
        className="grid gap-4 px-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))"
        }}>
        {MocStaff.map((v) => (
          <StaffCard key={v.id} {...v} />
        ))}
      </div>
    </Collapsible>
  );
};
