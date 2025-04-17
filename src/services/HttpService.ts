import axios, { AxiosHeaders, AxiosInstance } from "axios";
import { NewCabinValues } from ".";
import { Params } from "react-router-dom";

type HttpMethods = "get" | "post" | "patch" | "delete";

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
      data?: FormData | NewCabinValues;
      headers?: AxiosHeaders;
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

  handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.status === 401) return "Invalid email or password";
        return "There was an error with the request.";
      } else if (error.request) {
        return error.message;
      } else {
        return error.message || "Something went wrong. Please try again later.";
      }
    } else {
      return "An unknown error occurred.";
    }
  }
};

export const http = new HttpService(import.meta.env.VITE_WILD_OASIS_BASE_URL);

export const httpStorage = new HttpService(
  import.meta.env.VITE_WILD_OASIS_STORAGE_URL,
);
