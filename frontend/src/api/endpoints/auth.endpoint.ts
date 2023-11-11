import { AuthDto } from "api/models/auth.model";
import api from "api/utils/api";
import { setStoredAuthToken } from "api/utils/authToken";
import { parseJwt } from "api/utils/parseJwt";
import { TUser } from "react-telegram-auth";

export namespace AuthEndpoint {
  export const login = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const result = await api.post<AuthDto.Result>("/api/auth/login", params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    setStoredAuthToken(result.access_token);
    return parseJwt<AuthDto.Item>(result.access_token);
  };

  export const loginWithTelegram = async (user: TUser) => {
    const result = await api.post<string>("/api/auth/add/telegram", { ...user });

    setStoredAuthToken(result);
    return parseJwt<AuthDto.Item>(result);
  };
}
