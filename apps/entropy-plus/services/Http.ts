import axios, { AxiosInstance } from "axios";
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

  login(params: {}) {
    return this.http.post("");
  }
}

export default new Http();
