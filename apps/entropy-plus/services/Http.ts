import axios, { AxiosInstance } from "axios";
import env from "../environment";
import { LoginPayload } from "../interfaces";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";
import { MOCK_GET_SORT_RESPONSE } from "./mocks";

class Http {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: env.api.baseUrl,
      withCredentials: true,
    });
    this.http.interceptors.response.use((res) => res, ApiErrorInterceptor);
  }

  login({ username, password }: LoginPayload) {
    return this.http.post("/api/login/", { username, password });
  }

  refreshToken() {
    return this.http.post("/token/refresh");
  }

  getMe() {
    return this.http.get("/me");
  }

  async getSort() {
    return MOCK_GET_SORT_RESPONSE;
    // return this.http.get<GetSortResponse>("/sort");
  }
}

export default new Http();
