import { AuthEndpoint } from "api/endpoints/auth.endpoint";
import { AuthDto } from "api/models/auth.model";
import { removeStoredAuthToken } from "api/utils/authToken";
import { makeAutoObservable } from "mobx";

type AuthStatus = "loading" | "anonymous" | "authorized" | "unfinished";

class AuthServiceViewModel {
  public status: AuthStatus = "anonymous";
  public item: AuthDto.Item | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async login(username: string, password: string) {
    if (!username || !password) return false;
    try {
      const response = await AuthEndpoint.login(username, password);
      if (response) {
        this.status = "authorized";
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async logout() {
    this.status = "anonymous";
    this.item = null;
    removeStoredAuthToken();
  }
}

export const AuthService = new AuthServiceViewModel();
