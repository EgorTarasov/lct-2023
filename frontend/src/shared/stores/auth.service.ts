import { AuthEndpoint } from "api/endpoints/auth.endpoint";
import { AuthDto } from "api/models/auth.model";
import { removeStoredAuthToken } from "api/utils/authToken";
import { makeAutoObservable } from "mobx";

type AuthStatus = "loading" | "anonymous" | "authorized" | "unfinished";

class AuthServiceViewModel {
  public status: AuthStatus = "loading";
  public item: AuthDto.Item | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login() {
    this.status = "loading";
    try {
      const res = await AuthEndpoint.login("misis.larek.deda@mail.ru", "Test123456");
      this.status = "authorized";
      this.item = res;
    } catch {
      this.status = "anonymous";
      this.item = null;
    }
  }

  async logout() {
    this.status = "anonymous";
    this.item = null;
    removeStoredAuthToken();
  }
}

export const AuthService = new AuthServiceViewModel();
