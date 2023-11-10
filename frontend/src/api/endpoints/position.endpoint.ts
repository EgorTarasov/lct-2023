import { CommonDto } from "@/utils/common-dto";
import api from "api/utils/api";

export namespace PositionEndpoint {
  export const getAll = async () => {
    return await api.get<CommonDto.Named<number>[]>("/api/user/position/");
  };
}
