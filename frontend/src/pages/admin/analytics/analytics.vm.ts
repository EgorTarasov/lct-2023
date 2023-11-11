import { makeAutoObservable, runInAction } from "mobx";
import { AnalyticsEndpoint } from "api/endpoints/analytics.endpoint.ts";

export class AnalyticsViewModel {
  isAllDataLoading = false;
  isOnboardingDataLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAllData = async () => {
    this.isAllDataLoading = true;
    await runInAction(async () => {
      const byteCharacters: ArrayBuffer = await AnalyticsEndpoint.getActions();
      //download file
      const url = window.URL.createObjectURL(new Blob([byteCharacters]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "actions.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };

  getOnboardingData = async () => {
    // this.isOnboardingDataLoading = true;
    // await runInAction(async () => {
    //   const res = await AnalyticsEndpoint.getOnboarding();
    //   const url = window.URL.createObjectURL(new Blob([res]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", "onboarding.xlsx");
    //   document.body.appendChild(link);
    //   link.click();
    // });
    // this.isOnboardingDataLoading = false;
  };
}
