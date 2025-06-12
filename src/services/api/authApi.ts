import { toaster } from "@/components/ui/toaster";
import { http } from "../HttpService";
import { API_ENDPOINTS } from "@/utils/constants";
import { Credentials, LoginResType, UserDataRes } from "@/types/authTypes";
import { ImageFileType } from "@/types/cabinsTypes";
import { postImage } from "./indexApi";

export const createUser = ({
  fullName,
  ...userData
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const res = http.request<"">("post", API_ENDPOINTS.users.signup, {
    data: { ...userData, data: { fullName, avatar: null } },
  });

  toaster.promise(res, {
    success: { description: "User created successfully" },
    error: { description: "Failed to create new user" },
    loading: { description: "Creating user" },
  });

  return res;
};

export const login = async (credentials: Credentials) => {
  try {
    const res = await http.request<LoginResType>(
      "post",
      API_ENDPOINTS.users.token,
      {
        params: { grant_type: "password" },
        data: { ...credentials },
      },
    );
    http.setIsAuthenticated(true);
    return res.data;
  } catch (err) {
    toaster.error({
      description: "Incorrect email or password. Please try again",
    });
    return Promise.reject(err);
  }
};

export const logout = () => {
  const res = http.request<void>("post", API_ENDPOINTS.users.logout);

  toaster.promise(res, {
    loading: { description: "Logging out" },
    error: { description: "Failed to logout" },
    success: { description: "Logged out successfully" },
  });

  return res;
};

export const getCurrentUser = async () => {
  const res = await http.request<UserDataRes>("get", API_ENDPOINTS.users.user);
  return res.data;
};

export const requestNewAccessToken = () => {
  const refreshToken = localStorage.getItem("refresh_token") as string;
  const res = http.request<{ access_token: string; refresh_token: string }>(
    "post",
    API_ENDPOINTS.users.token,
    {
      params: {
        grant_type: "refresh_token",
      },
      data: { refresh_token: refreshToken },
    },
  );

  return res;
};

export const updateAccount = async (
  {
    fullName,
    avatarFile,
  }: {
    fullName: string;
    avatarFile: null | ImageFileType;
  },
  oldAvatarPath?: string,
) => {
  try {
    if (avatarFile !== null && oldAvatarPath) {
      const bucketName = `object/avatars/${avatarFile.name}`;
      const imagePath = await postImage(bucketName, avatarFile);

      http.request<"">("put", API_ENDPOINTS.users.user, {
        data: { data: { fullName: fullName, avatar: imagePath } },
      });
      http.request<"">("delete", oldAvatarPath);
    } else {
      http.request<"">("put", API_ENDPOINTS.users.user, {
        data: { data: { fullName: fullName } },
      });
    }
  } catch {
    toaster.error({ description: "Failed to update account" });
  }
};

export const changePassword = (password: string) => {
  const res = http.request<"">("put", API_ENDPOINTS.users.user, {
    data: { password: password },
  });

  toaster.promise(res, {
    loading: { description: "Chan" },
    error: { description: "Failed to logout" },
    success: { description: "Logged out successfully" },
  });
};
