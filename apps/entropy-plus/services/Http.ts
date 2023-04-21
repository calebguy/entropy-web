import axios, { AxiosInstance } from "axios";
import { PROXY_PREFIX } from "../constants";
import env from "../environment";
import {
  CuratorPhoto,
  LoginDto,
  PostLoginResponse,
  Profile,
  Sort,
  TwitterChannel,
  TwitterChannelScreenName,
} from "../interfaces";
import { AuthTokens } from "./../interfaces/index";

export class EntropyHttp {
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
    return this.http.post<AuthTokens>("/api/login/token/refresh/");
  }

  logout() {
    return this.http.post("/api/login/token/logout/");
  }

  getMe() {
    return this.http.get<Profile>("/api/login/me/");
  }

  getPing() {
    return this.http.get("/api/ping");
  }

  postImage(image: File) {
    const formData = new FormData();
    formData.append("picture", image);
    return this.http.post("/api/upload/image/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // NOTE: this throws cors error
  joinWaitlist(email: string) {
    return axios.post(
      "https://ennntropy.us13.list-manage.com/subscribe/post?u=5c84115078e1be86656f0e0cc&amp;id=4bb9cd5490&amp;f_id=00c2e0e2f0",
      { email }
    );
  }

  getSortImage(slug: string) {
    return this.http.get<Sort[]>(`/api/v1/sort/`, {
      params: { slug },
    });
  }

  getTwitterChannel(channel: TwitterChannelScreenName) {
    return this.http.get<TwitterChannel>(`/api/twitter-channels/${channel}/`);
  }

  getTwitterChannels() {
    return this.http.get<TwitterChannel[]>("/api/v1/twitter-channels/");
  }

  approveImage(
    id: number,
    slug: string,
    twitterChannel: TwitterChannelScreenName
  ) {
    return this.http.patch<Sort>(`/api/images/${id}/update/`, {
      params: { slug },
    });
  }

  rejectImage(
    id: number,
    slug: string,
    twitterChannel: TwitterChannelScreenName
  ) {
    return this.http.patch<Sort>(`/api/images/${id}/update/decline/`, {
      params: { slug },
    });
  }

  getLeaderboard() {
    return this.http.get<Profile[]>("/api/leaderboard");
  }

  getCuratorPhoto(curator: string, id: string | number) {
    return this.http.get<CuratorPhoto>(`/api/${curator}/photos/${id}/`);
  }

  getCuratorProfile(curator: string) {
    return this.http.get<Profile>(`/api/profiles/${curator}/`);
  }

  getCuratorPhotos(curator: string) {
    return this.http.get<Array<CuratorPhoto>>(`/api/${curator}/photos/`);
  }

  getSuggestedPhotos() {
    return this.http.get<Array<CuratorPhoto>>("/api/suggested-photos");
  }

  getDashboard(slug: string) {
    return this.http.get(`/api/${slug}/dashboard/`);
  }

  static createForServer() {
    return new _HttpForServer();
  }

  static createForClient() {
    return new _HttpForClient();
  }
}

// NOTE: The server HTTP instance does not automatically refresh tokens on its own,
// as we we'd need to supply the requests context on every request which is meh
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
          config._retry = true;
          await this.refreshToken();
          return this.http(config);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
}

export const HttpForServer = EntropyHttp.createForServer();
export const HttpForClient = EntropyHttp.createForClient();
