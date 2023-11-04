import api from "api/utils/api";

export namespace AuthDto {
  const login = async () => api.post("/login");
}
