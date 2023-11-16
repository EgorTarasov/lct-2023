import { makeAutoObservable } from "mobx";
import { SurveyEndpoint } from "api/endpoints/survey.endpoint.tsx";
import { SurverDto } from "api/models/survey.model.ts";

export class MeetingViewModel {
  isLoading = true;
  isQuestionAdded: boolean | null = null;
  qrData: string | null = null;

  constructor() {
    makeAutoObservable(this);
    void this.loadQrCode();
  }

  async loadQrCode() {
    try {
      this.qrData = await SurveyEndpoint.generateToken();
      this.isQuestionAdded = true;
    } catch (e) {
      this.isQuestionAdded = false;
    } finally {
      this.isLoading = false;
    }
  }

  async addFacts(x: SurverDto.FactTemplate) {
    await SurveyEndpoint.createFact(x);
    await this.loadQrCode();
  }
}
