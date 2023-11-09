import { CourseDto } from "api/models/course.model";
import api from "api/utils/api";

// export namespace AuthEndpoint {
//   export const login = async (username: string, password: string) => {
//     const params = new URLSearchParams();
//     params.append("username", username);
//     params.append("password", password);

//     const result = await api.post<CourseDto.Result>("/api/auth/login", params.toString(), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     });

//     setStoredAuthToken(result.access_token);
//     return parseJwt<AuthDto.Item>(result.access_token);
//   };
// }
