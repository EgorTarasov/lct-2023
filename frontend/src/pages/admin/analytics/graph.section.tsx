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
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AnalyticsViewModel } from "./analytics.vm";
import { observer } from "mobx-react-lite";
import { COLORS, mockSatisfaction } from "./mock_data";

export const GraphSection: FCVM<AnalyticsViewModel> = observer(({ vm }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mb-4">Сводка</h2>
      <div
        className="grid gap items-center gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
        }}>
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
      </div>
      <div className="flex flex-col max-w-[calc(100vw-48px)]">
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
      <div className="flex flex-col">
        <p className="text-lg m">Настроение</p>
        <ResponsiveContainer height={300}>
          <RadarChart outerRadius={90} data={mockSatisfaction}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 14]} />
            <Radar name="Кирилл" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Егор" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
