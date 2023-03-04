import axios, { AxiosInstance } from "axios";
import { LoginDto, PostLoginResponse } from "../interfaces";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";
import {
  GET_MOCK_DASHBAORD_RESPONSE,
  GET_MOCK_GET_CURATOR_IMAGE_RESPONSE,
  GET_MOCK_GET_SORT_RESPONSE,
  GET_MOCK_LEADERBOARD_RESPONSE,
  GET_MOCK_PROFILE_RESPONSE,
} from "./mocks";

// @next -- base instance that implements all routes
// @next -- one instance only calls proxys endpoints
// @next -- other instance calls api directly

class _Http {
  static PROXY_PREFIX = "/api/proxy";
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: _Http.PROXY_PREFIX,
      withCredentials: true,
    });
    // custom interceptor possibly for server vs client??
    this.http.interceptors.response.use((res) => res, ApiErrorInterceptor);
  }

  login({ username, password }: LoginDto) {
    return this.http.post<PostLoginResponse>("/api/login/token/", {
      username,
      password,
    });
  }

  refreshToken() {
    return this.http.post("/token/refresh");
  }

  getMe() {
    return this.http.get("/api/login/me");
  }

  async getSort() {
    return { data: GET_MOCK_GET_SORT_RESPONSE() };
    // return this.http.get<GetSortResponse>("/sort");
  }

  async getProfile(slug: string) {
    return { data: GET_MOCK_PROFILE_RESPONSE() };
    // return this.http.get<GetProfileResponse>(`/profile/${slug}`);
  }

  async getCuratorImage(curatorSlug: string, id: string) {
    return { data: GET_MOCK_GET_CURATOR_IMAGE_RESPONSE(Number(id)) };
    // return this.http.get<GetCuratorImageResponse>(`${curatorSlug}/image/${id}`);
  }

  async getDashboard() {
    return { data: GET_MOCK_DASHBAORD_RESPONSE() };
    // return this.http.get<GetDashboardResponse>("/dashboard");
  }

  async getLeaderboard() {
    return { data: GET_MOCK_LEADERBOARD_RESPONSE() };
    // return this.http.get<GetLeaderboardResponse>("/leaderboard");
  }

  private getAuthHeader() {}
}

const Http = new _Http();
export default Http;
