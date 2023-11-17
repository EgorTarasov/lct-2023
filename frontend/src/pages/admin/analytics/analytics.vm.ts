import { makeAutoObservable, runInAction } from "mobx";
import { getStoredAuthToken } from "api/utils/authToken";
import { EventDto } from "api/models/event.model";
import { EventsEndpoint } from "api/endpoints/events.endpoint";

function generateNormalRandom(mean: number = 0, stdDeviation: number = 1): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdDeviation + mean;
}

function getCentralTendencyRandomValue(min: number, max: number): number {
  const mean = (min + max) / 2;
  const stdDeviation = (max - min) / 6; // 99.7% of values will fall within [min, max]
  let value;
  do {
    value = generateNormalRandom(mean, stdDeviation);
  } while (value < min || value > max);
  return Math.round(value);
}

export class AnalyticsViewModel {
  isAllDataLoading = false;
  isOnboardingDataLoading = false;
  public events: EventDto.Item[] | null = null;
  public mockEventData:
    | {
        name: string;
        attendance: number;
        registrations: number;
      }[]
    | null = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  public async init() {
    const res = await EventsEndpoint.current();
    this.events = res.map(EventDto.convertDtoToItem);

    this.mockEventData = this.events.map((v) => {
      const rand = getCentralTendencyRandomValue(2, 60);
      return {
        name: v.title,
        attendance: getCentralTendencyRandomValue(1, rand),
        registrations: rand
      };
    });
  }

  getAllData = async () => {
    this.isAllDataLoading = true;
    await runInAction(async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/actions`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getStoredAuthToken()}`,
          "Access-Control-Allow-Origin": "*"
        },
        method: "GET"
      });
      const url = window.URL.createObjectURL(new Blob([await res.blob()]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `all-actions-${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
    this.isAllDataLoading = false;
  };

  getOnboardingData = async () => {
    this.isOnboardingDataLoading = true;
    await runInAction(async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/onboarding`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getStoredAuthToken()}`,
          "Access-Control-Allow-Origin": "*"
        },
        method: "GET"
      });
      const url = window.URL.createObjectURL(new Blob([await res.blob()]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `onboarding-${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
    this.isAllDataLoading = false;
  };
}
