import { toaster } from '@/components/ui/toaster';
import { httpAuth } from '../HttpService';

export interface UserData {
  fullName: string;
  email: string;
  password: string;
}

export const createUser = ({ fullName, ...userData }: UserData) => {
  const res = httpAuth.request<''>('post', 'signup', {
    data: { ...userData, data: { fullName, avatar: '' } },
  });

  toaster.promise(res, {
    success: { description: 'User created successfully' },
    error: { description: 'Failed to create new user' },
    loading: { description: 'Creating user' },
  });

  return res;
};
