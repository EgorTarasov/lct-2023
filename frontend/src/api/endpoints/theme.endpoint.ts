import { ThemeDto } from "api/models/theme.model";
import api from "api/utils/api";

export namespace ThemeEndpoint {
  export const current = async () => {
    return await api.get<ThemeDto.Item>("/api/theme/?id=1");
  };

  export const update = async (theme: ThemeDto.Item) => {
    return await api.put("/api/theme/", { ...theme, id: 1 });
  };
}
