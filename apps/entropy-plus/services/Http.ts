import axios, { AxiosInstance } from "axios";
import { PROXY_PREFIX } from "../constants";
import env from "../environment";
import { LoginDto, PostLoginResponse } from "../interfaces";
import { AuthTokens, Me } from "./../interfaces/index";
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
    // this.http.interceptors.response.use((res) => res, ApiErrorInterceptor);
  }

  login({ username, password }: LoginDto) {
    return this.http.post<PostLoginResponse>("/api/login/token/", {
      username,
      password,
    });
  }

  refreshToken() {
    return this.http.post<AuthTokens>("/api/login/token/refresh/");
  }

  getMe() {
    return this.http.get<Me>("/api/login/me");
  }

  getPing() {
    return this.http.get("/api/ping");
  }

  postImage() {
    return this.http.post("/api/upload/image");
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

class _HttpForServer extends EntropyHttp {
  private _accessToken?: string;
  private _refreshToken?: string;

  constructor() {
    super(env.api.baseUrl);
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

class _HttpForClient extends EntropyHttp {
  constructor() {
    super(PROXY_PREFIX);
    this.http.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error?.config;
        if (error?.response?.status === 401 && !config._retry) {
          config.sent = true;
          await this.refreshToken();
          return this.http(config);
        }
      }
    );
  }
}

export const HttpForServer = new _HttpForServer();
export const HttpForClient = new _HttpForClient();
