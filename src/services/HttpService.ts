import axios, { AxiosInstance, AxiosResponse } from 'axios';

type HttpMethods = 'get' | 'post' | 'patch' | 'delete';

const HttpService = class HttpService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        apikey: import.meta.env.VITE_WILD_OASIS_API_KEY,
      },
    });
  }

  async request<Res>(method: HttpMethods, endpoint: string) {
    try {
      const res: AxiosResponse<Res> = await this.instance[method](endpoint);
      return res.data;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.status === 401) return 'Invalid email or password';
        return 'There was an error with the request.';
      } else if (error.request) {
        return error.message;
      } else {
        return error.message || 'Something went wrong. Please try again later.';
      }
    } else {
      return 'An unknown error occurred.';
    }
  }
};

export const http = new HttpService(import.meta.env.VITE_WILD_OASIS_BASE_URL);
