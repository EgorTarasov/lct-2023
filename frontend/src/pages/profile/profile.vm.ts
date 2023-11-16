import { EventsEndpoint } from "api/endpoints/events.endpoint";
import { SurveyEndpoint } from "api/endpoints/survey.endpoint";
import { UserEndpoint } from "api/endpoints/user.endpoint";
import { EventDto } from "api/models/event.model";
import { UserDto } from "api/models/user.model";
import { makeAutoObservable } from "mobx";

export class ProfilePageViewModel {
  public user: UserDto.Current | null = null;
  public events: EventDto.Item[] | null = null;
  public factQuestion: string = "";
  public factAnswer: string = "";
  private hasFact = false;
  public factLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    this.user = await UserEndpoint.profile();
    this.hasFact = this.user.fact != null; // важно что не ===
    this.factQuestion = this.user.fact?.question ?? "";
    this.factAnswer = this.user.fact?.answer ?? "";
    const res = await EventsEndpoint.current();
    this.events = res.map(EventDto.convertDtoToItem);
  }

  public async registerEvent(id: number) {
    await EventsEndpoint.enroll(id);

    const res = await EventsEndpoint.current();
    this.events = res.map(EventDto.convertDtoToItem);
  }

  get factWasChanged() {
    if (!this.hasFact) {
      return this.factQuestion !== "" && this.factAnswer !== "";
    }

    return (
      this.factQuestion !== this.user?.fact?.question || this.factAnswer !== this.user?.fact?.answer
    );
  }

  public updateFact = async () => {
    if (this.factQuestion === "" || this.factAnswer === "") {
      return;
    }
    this.factLoading = true;

    try {
      if (this.hasFact) {
        await SurveyEndpoint.updateFact({
          question: this.factQuestion,
          answer: this.factAnswer,
          id: this.user!.fact!.id
        });
      } else {
        await SurveyEndpoint.createFact({
          question: this.factQuestion,
          answer: this.factAnswer
        });
      }

      this.user = await UserEndpoint.profile();
      this.hasFact = this.user.fact != null; // важно что не ===
      this.factQuestion = this.user.fact?.question ?? "";
      this.factAnswer = this.user.fact?.answer ?? "";
    } finally {
      this.factLoading = false;
    }
  };
}
