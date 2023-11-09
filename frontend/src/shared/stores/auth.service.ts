import { AuthEndpoint } from "api/endpoints/auth.endpoint";
import { UserEndpoint } from "api/endpoints/user.endpoint";
import { AuthDto } from "api/models/auth.model";
import { UserDto } from "api/models/role.model";
import { removeStoredAuthToken } from "api/utils/authToken";
import { makeAutoObservable } from "mobx";

export type Auth =
  | {
      state: "loading";
    }
  | {
      state: "anonymous";
    }
  | {
      state: "authorized";
      auth: AuthDto.Item;
      user: UserDto.Item;
    };

class AuthServiceViewModel {
  public auth: Auth = { state: "loading" };

  constructor() {
    makeAutoObservable(this);
  }

  public async login(username: string, password: string): Promise<boolean> {
    if (!username || !password) return false;
    try {
      const auth = await AuthEndpoint.login(username, password);
      if (auth) {
        const user = await UserEndpoint.current();
        this.auth = {
          state: "authorized",
          auth,
          user
        };
        return true;
      }
    } catch {
      this.auth = { state: "anonymous" };
    }
    return false;
  }

  async logout() {
    this.auth = { state: "anonymous" };
    removeStoredAuthToken();
  }
}

export const AuthService = new AuthServiceViewModel();
