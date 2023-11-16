import { SurverDto } from "api/models/survey.model.ts";
import api from "api/utils/api";

export namespace SurveyEndpoint {
  export const createFact = async (x: SurverDto.FactTemplate) => {
    return await api.post("/api/user/fact/create", x);
  };

  export const updateFact = async (x: SurverDto.Fact) => {
    return await api.put("/api/user/fact/update", x);
  };

  export const generateToken = async () => {
    return await api.get<string>("/api/user/fact/generate-token");
  };

  const getSurveyByToken = async (x: SurverDto.SurveyToken) => {
    return await api.post<SurverDto.Survey>(`/api/user/fact/suervey/?token=${x.token}`);
  };

  const checkSurvey = async (x: SurverDto.CheckSurvey) => {
    return await api.post<boolean>(
      `/api/user/fact/check-survey?token=${x.token}&answer=${x.answer}`
    );
  };
}
