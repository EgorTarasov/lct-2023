import { UserEndpoint } from "api/endpoints/user.endpoint";
import { UserDto } from "api/models/user.model";
import { makeAutoObservable } from "mobx";

export class ProfilePageViewModel {
  public user: UserDto.Current | null = null;
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    this.user = await UserEndpoint.profile();
  }
}
