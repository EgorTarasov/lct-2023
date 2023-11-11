import { ThemeDto } from "api/models/theme.model";
import api from "api/utils/api";

export namespace ThemeEndpoint {
  export const current = async () => {
    return await api.get<ThemeDto.Item>("/api/theme/?id=1");
  };

  export const put = async (theme: string) => {
    return await api.put<ThemeDto.Item & { id: string }>("/api/theme/", theme);
  };
}
