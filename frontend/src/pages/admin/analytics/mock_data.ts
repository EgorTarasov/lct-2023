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
    name: "Прошли",
    value: 869
  },
  {
    name: "Не прошли",
    value: 131
  }
];

export const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

export const mockSatisfaction = [
  {
    subject: "Воодушевленный",
    A: 3,
    B: 9,
    fullMark: 10
  },
  {
    subject: "Удовлетворенный",
    A: 9,
    B: 10,
    fullMark: 10
  },
  {
    subject: "Нейтральный",
    A: 7,
    B: 4,
    fullMark: 10
  },
  {
    subject: "Смущенный",
    A: 2,
    B: 9,
    fullMark: 10
  },
  {
    subject: "Перегруженный информацией",
    A: 10,
    B: 8,
    fullMark: 10
  }
];
