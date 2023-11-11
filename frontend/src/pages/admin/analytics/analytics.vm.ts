import { makeAutoObservable, runInAction } from "mobx";
import { getStoredAuthToken } from "api/utils/authToken";

export class AnalyticsViewModel {
  isAllDataLoading = false;
  isOnboardingDataLoading = false;

  constructor() {
    makeAutoObservable(this);
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
