import axios, { AxiosInstance } from "axios";
import { CabinType } from "../types/cabinsTypes";
import { BookingDetailsType } from "../types/bookingsTypes";
import { UpdateSettingsRequestType } from "./api/settingsApi";
import { Credentials, UserData } from "../types/authTypes";
import { requestNewAccessToken } from "./api/authApi";

type HttpParams = Record<string, string | string[]>;

type HttpMethods = "get" | "post" | "patch" | "put" | "delete";

type HttpDataType =
  | FormData
  | CabinType
  | UserData
  | Credentials
  | UpdateSettingsRequestType
  | Partial<CabinType>
  | Partial<BookingDetailsType>
  | { data: { fullName: string; avatar?: string | null } }
  | { refresh_token: string }
  | { password: string };

const HttpService = class HttpService {
  private instance: AxiosInstance;
  private isAuthenticated: boolean =
    localStorage.getItem("refresh_token") === null ? false : true;
  private retry = false;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 20000,
      headers: {
        apiKey: import.meta.env.VITE_WILD_OASIS_API_KEY,
      },
    });
    this.instance.interceptors.request.use(
      // To inject the access token for all requests if exits
      (request) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken !== null) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }

        return request;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      // Directly return successful responses
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          (error.status === 403 || error.status === 401) &&
          !this.retry &&
          this.isAuthenticated
        ) {
          try {
            const res = await requestNewAccessToken();
            const { access_token, refresh_token: newRefreshToken } = res.data;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", newRefreshToken);
            this.instance.defaults.headers.common["Authorization"] =
              `Bearer ${access_token}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            this.clearAuthTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        } else if (this.retry) {
          this.retry = true;
        }
        return Promise.reject(error);
      },
    );
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  clearAuthTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  request<Res>(
    method: HttpMethods,
    endpoint: string,
    config?: {
      params?: HttpParams;
      data?: HttpDataType;
      headers?: { range: string };
    },
  ) {
    return this.instance.request<Res>({
      method,
      url: endpoint,
      data: config?.data,
      params: config?.params,
      headers: config?.headers,
    });
  }
};

export const http = new HttpService(import.meta.env.VITE_WILD_OASIS_BASE_URL);
