import axios, { AxiosInstance } from "axios";
import { PROXY_PREFIX } from "../constants";
import env from "../environment";
import { LoginDto, PostLoginResponse } from "../interfaces";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";
import {
  GET_MOCK_DASHBAORD_RESPONSE,
  GET_MOCK_GET_CURATOR_IMAGE_RESPONSE,
  GET_MOCK_GET_SORT_RESPONSE,
  GET_MOCK_LEADERBOARD_RESPONSE,
  GET_MOCK_PROFILE_RESPONSE,
} from "./mocks";

class EntropyHttp {
  protected http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
  }

  login({ username, password }: LoginDto) {
    return this.http.post<PostLoginResponse>("/api/login/token/", {
      username,
      password,
    });
  }

  refreshToken() {
    return this.http.post("/api/login/token/refresh/");
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
}

class _Http extends EntropyHttp {
  private _accessToken?: string;
  private _refreshToken?: string;

  constructor(baseURL: string) {
    super(baseURL);
    this.http.interceptors.response.use((res) => res, ApiErrorInterceptor);
  }

  setAccessToken(accessToken: string) {
    this._accessToken = accessToken;
    this.updateInterceptor();
  }

  setRefreshToken(refreshToken: any) {
    this._refreshToken = refreshToken;
    this.updateInterceptor();
  }

  private updateInterceptor() {
    this.http.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${this._accessToken}`;
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";
        if (this._refreshToken) {
          config.headers["Cookie"] = `refresh_token=${this._refreshToken};`;
        }
        return config;
      },
      (e) => Promise.reject(e)
    );
  }
}

export const Http = new _Http(env.api.baseUrl);
export const HttpProxy = new _Http(PROXY_PREFIX);
