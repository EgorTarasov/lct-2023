import { AuthDto } from "api/models/auth.model";
import { UserDto } from "api/models/role.model";
import api from "api/utils/api";
import { setStoredAuthToken } from "api/utils/authToken";
import { parseJwt } from "api/utils/parseJwt";

export namespace UserEndpoint {
  export const current = async () => {
    return await api.get<UserDto.Item>("/api/user/me");
  };
}
