import api from "api/utils/api.ts";

export namespace AnalyticsEndpoint {
  export const getActions = async () => {
    return await api.get<ArrayBuffer>("/api/analytics/actions");
  };

  export const getOnboarding = async () => {
    return await api.get<Blob>("/api/analytics/onboarding");
  };
}
