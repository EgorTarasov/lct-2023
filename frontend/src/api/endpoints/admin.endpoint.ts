import { UserDto } from "api/models/user.model";
import api from "api/utils/api";

export namespace AdminEndpoint {
  export const registerUser = async (user: UserDto.Update) => {
    return await api.post<string>("/api/admin/register", user);
  };

  export const getMentees = async () => {
    return await api.get<UserDto.Item[]>("/api/mentor/me");
  };
}
