import { FCVM } from "@/utils/fcvm";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsViewModel } from "./analytics.vm";
import { observer } from "mobx-react-lite";

export const GraphSection: FCVM<AnalyticsViewModel> = observer(({ vm }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">Сводка</h2>
      <div
        className="grid gap items-center gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(324px, 1fr))"
        }}>
        {/* {
        name: string;
        attendance: number;
        registrations: number;
      } */}
        {vm.mockEventData && (
          <div className="flex flex-col">
            <p className="text-lg m">Статистика посещений</p>
            <ResponsiveContainer height={300}>
              <BarChart data={vm.mockEventData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar name="Посетило мероприятий" dataKey="attendance" fill="#8884d8" />
                <Bar name="Зарегистрировалось" dataKey="registrations" fill="#82ca9d" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
});
