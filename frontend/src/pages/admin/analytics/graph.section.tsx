import { FCVM } from "@/utils/fcvm";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AnalyticsViewModel } from "./analytics.vm";
import { observer } from "mobx-react-lite";
import { COLORS } from "./mock_data";

export const GraphSection: FCVM<AnalyticsViewModel> = observer(({ vm }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mb-4">Сводка</h2>
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
        <div className="flex flex-col">
          <p className="text-lg m">Новые сотрудники</p>
          <ResponsiveContainer height={300}>
            <LineChart data={vm.mockRegistrationsData}>
              <XAxis dataKey="date" name="Дата" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                name="Количество новых сотрудников"
                type="monotone"
                dataKey="registrations"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col col-span-2">
          <p className="text-lg m">Статистика онбординга</p>
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                data={vm.mockOnboarding}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value">
                {vm.mockOnboarding.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={(value) => `Статус: ${value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});
