import { makeAutoObservable, runInAction } from "mobx";
import { getStoredAuthToken } from "api/utils/authToken";
import { EventDto } from "api/models/event.model";
import { EventsEndpoint } from "api/endpoints/events.endpoint";
import { getCentralTendencyRandomInteger } from "@/utils/randomGenerator";
import { RegistrationData, generateMockRegistrations, mockOnboarding } from "./mock_data";

export class AnalyticsViewModel {
  isAllDataLoading = false;
  isOnboardingDataLoading = false;
  public events: EventDto.Item[] | null = null;
  public mockOnboarding = mockOnboarding;
  public mockRegistrationsData = generateMockRegistrations();
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
      const rand = getCentralTendencyRandomInteger(v.title, 2, 62);
      return {
        name: v.title,
        attendance: getCentralTendencyRandomInteger(v.title, 1, rand),
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
