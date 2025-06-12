export interface Credentials {
  email: string;
  password: string;
}
export interface UserData extends Credentials {
  fullName: string;
  avatar: string;
}

export interface UserDataRes {
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
