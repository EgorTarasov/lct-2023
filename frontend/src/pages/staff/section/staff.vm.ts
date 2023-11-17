import { makeAutoObservable } from "mobx";
import { SurverDto } from "api/models/survey.model.ts";
import { SurveyEndpoint } from "api/endpoints/survey.endpoint.tsx";

export class StaffViewModel {
  survey: SurverDto.Survey | null = null;
  surveyToken: string | null = null;
  isValid: boolean | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getSurveyByUid = async (uid: string) => {
    this.survey = await SurveyEndpoint.getSurveyByToken(uid);
  };

  checkValidAnswer = (answer: string) => {
    const ans = answer.toLowerCase().replace(" ", "");
    const validAnswers = this.survey?.fact.answer.toLowerCase().replace(" ", "");
    this.isValid = ans === validAnswers;
  };
}
