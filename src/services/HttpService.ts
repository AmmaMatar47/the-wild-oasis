import axios, { AxiosInstance } from "axios";
import { CabinType } from "./api/cabinsApi";
import { Params } from "react-router-dom";
import { BookingDetailsType } from "./api/bookingsApi";
import { UpdateSettingsRequestType } from "./api/settingsApi";
import { UserData } from "./api/authApi";

type HttpMethods = "get" | "post" | "patch" | "delete";

type HttpBodyType =
  | FormData
  | CabinType
  | UserData
  | UpdateSettingsRequestType
  | Partial<CabinType>
  | Partial<BookingDetailsType>
  | { data: { fullName: string; avatar: string } };

const HttpService = class HttpService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 20000,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_WILD_OASIS_API_KEY}`,
        apiKey: import.meta.env.VITE_WILD_OASIS_API_KEY,
      },
    });
  }

  request<Res>(
    method: HttpMethods,
    endpoint: string,
    config?: {
      params?: Params;
      data?: HttpBodyType;
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

export const httpAuth = new HttpService(
  import.meta.env.VITE_WILD_OASIS_AUTH_URL,
);

export const httpStorage = new HttpService(
  import.meta.env.VITE_WILD_OASIS_STORAGE_URL,
);
