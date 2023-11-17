import { getCentralTendencyRandomInteger } from "@/utils/randomGenerator";

export type RegistrationData = {
  date: string;
  registrations: number;
};

// Функция для генерации случайного количества регистраций
const getRandomRegistrations = () =>
  getCentralTendencyRandomInteger(Math.random().toString(), 1, 20);

// Функция для форматирования даты в формате YYYY-MM-DD
const formatDate = (date: Date): string => date.toISOString().split("T")[0];

export const generateMockRegistrations = (): RegistrationData[] => {
  const data: RegistrationData[] = [];
  const today = new Date();

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({ date: formatDate(date), registrations: getRandomRegistrations() });
  }

  return data;
};

export const mockOnboarding = [
  {
    name: "Прошли онбординг",
    value: 869
  },
  {
    name: "Не прошли онбординг",
    value: 131
  }
];

export const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
