import axios, { AxiosInstance } from "axios";
import env from "../environment";
import { LoginPayload } from "../interfaces";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";
import {
  GET_MOCK_GET_CURATOR_IMAGE_RESPONSE,
  GET_MOCK_GET_SORT_RESPONSE,
  MOCK_GET_PROFILE_RESPONSE,
} from "./mocks";

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
    return { data: GET_MOCK_GET_SORT_RESPONSE() };
    // return this.http.get<GetSortResponse>("/sort");
  }

  async getProfile(slug: string) {
    return { data: MOCK_GET_PROFILE_RESPONSE };
    // return this.http.get<GetProfileResponse>(`/profile/${slug}`);
  }

  async getCuratorImage(curatorSlug: string, id: string) {
    return { data: GET_MOCK_GET_CURATOR_IMAGE_RESPONSE(Number(id)) };
    // return this.http.get<GetCuratorImageResponse>(`${curatorSlug}/image/${id}`);
  }
}

export default new Http();
