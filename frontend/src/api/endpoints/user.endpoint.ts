import { AuthDto } from "api/models/auth.model";
import { UserDto } from "api/models/user.model";
import api from "api/utils/api";
import { setStoredAuthToken } from "api/utils/authToken";
import { parseJwt } from "api/utils/parseJwt";

export namespace UserEndpoint {
  export const current = async () => {
    return await api.get<UserDto.Item>("/api/user/me");
  };

  export const getMentees = async () => {
    return await api.get<UserDto.Item[]>("/api/mentee/my");
  };

  export const profile = async () => {
    return await api.get<UserDto.Current>("/api/user/profile");
  };
}
