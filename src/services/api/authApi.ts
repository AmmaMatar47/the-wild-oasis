import { toaster } from '@/components/ui/toaster';
import { http } from '../HttpService';
import { API_ENDPOINTS } from '@/utils/constants';

export interface Credentials {
  email: string;
  password: string;
}
export interface UserData extends Credentials {
  fullName: string;
  avatar: string;
}

interface UserDataRes {
  role: string;
  user_metadata: { email: string; fullName: string; avatar: string };
}

export interface LoginResType {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  user: UserDataRes;
}

export const createUser = ({ fullName, ...userData }: UserData) => {
  const res = http.request<''>('post', `${API_ENDPOINTS.auth}/signup`, {
    data: { ...userData, data: { fullName, avatar: '' } },
  });

  toaster.promise(res, {
    success: { description: 'User created successfully' },
    error: { description: 'Failed to create new user' },
    loading: { description: 'Creating user' },
  });

  return res;
};

export const login = async (credentials: Credentials) => {
  try {
    const res = await http.request<LoginResType>('post', `${API_ENDPOINTS.auth}/token`, {
      params: { grant_type: 'password' },
      data: { ...credentials },
    });
    http.setIsAuthenticated(true);
    return res.data;
  } catch (err) {
    toaster.error({
      description: 'Incorrect email or password. Please try again',
    });
    return Promise.reject(err);
  }
};

export const logout = () => {
  const res = http.request<void>('post', `${API_ENDPOINTS.auth}/logout`);

  toaster.promise(res, {
    loading: { description: 'Logging out' },
    error: { description: 'Failed to logout' },
    success: { description: 'Logged out successfully' },
  });

  return res;
};

export const getCurrentUser = async () => {
  const res = await http.request<UserDataRes>('get', `${API_ENDPOINTS.auth}/user`);
  return res.data;
};

export const requestNewAccessToken = () => {
  const refreshToken = localStorage.getItem('refresh_token') as string;
  const res = http.request<{ access_token: string; refresh_token: string }>(
    'post',
    `${API_ENDPOINTS.auth}/token`,
    {
      params: {
        grant_type: 'refresh_token',
      },
      data: { refresh_token: refreshToken },
    }
  );

  return res;
};
