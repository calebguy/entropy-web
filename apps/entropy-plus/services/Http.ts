import axios, { AxiosInstance } from "axios";
import env from "../environment";
import { LoginPayload } from "../interfaces";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";

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

  async getTwitterChannels() {
    // return this.http.get<TwitterChannel[]>("NOOP");

    // @next -- if these don't change often we can bake into the frontend
    return [
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1608845499431264258/H39bmJlO_400x400.jpg",
        screen_name: "0",
      },
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1492066955204849666/PShpHTb__400x400.jpg",
        screen_name: "1",
      },
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1492195515135631367/SLy_sQpB_400x400.jpg",
        screen_name: "2",
      },
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1515010243956117504/0hY7QkOn_400x400.jpg",
        screen_name: "3",
      },
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1515010243956117504/0hY7QkOn_400x400.jpg",
        screen_name: "4",
      },
      {
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1569993679980331008/xpzldIsC_400x400.jpg",
        screen_name: "5",
      },
    ];
  }
}

export default new Http();
