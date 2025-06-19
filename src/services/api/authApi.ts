import { toaster } from "@/components/ui/toaster";
import { http } from "../HttpService";
import { API_ENDPOINTS } from "@/utils/constants";
import { Credentials, LoginResType, UserDataRes } from "@/types/authTypes";
import { ImageFileType } from "@/types/cabinsTypes";
import { postImage } from "./indexApi";
import axios from "axios";

export const createUser = async ({
  fullName,
  ...userData
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await http.request<LoginResType>(
      "post",
      API_ENDPOINTS.users.signup,
      {
        data: { ...userData, data: { fullName, avatar: null } },
      },
    );
    toaster.success({ description: "Account created successfully" });

    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toaster.error({
        title: "Account creation failed",
        description: err.response?.data?.msg
          ? `${err.response.data.msg}. Please try again.`
          : "Something went wrong. Please try again later.",
      });
    } else {
      toaster.error({
        description: `Account creation failed, Please try again`,
      });
    }
    throw new Error();
  }
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
  oldAvatarURL?: string,
) => {
  try {
    toaster.loading({ description: "Updating", id: "uploading" });
    let imagePath;
    if (avatarFile !== null && oldAvatarURL) {
      const bucketName = `object/avatars/${avatarFile.name}`;
      // Upload new Avatar
      imagePath = await postImage(bucketName, avatarFile);
      // Delete old Avatar
      http.request<void>("delete", oldAvatarURL);
    }
    // Update user data
    const res = await http.request<UserDataRes>(
      "put",
      API_ENDPOINTS.users.user,
      {
        data: { data: { fullName: fullName, avatar: imagePath } },
      },
    );
    toaster.success({ description: "Account updated successfully" });
    return res.data;
  } catch {
    toaster.error({ description: "Failed to update account" });
    throw new Error();
  } finally {
    toaster.dismiss("uploading");
  }
};

export const changePassword = async (password: string) => {
  try {
    const res = await http.request<void>("put", API_ENDPOINTS.users.user, {
      data: { password: password },
    });

    toaster.success({ description: "Password changed successfully" });

    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toaster.error({
        title: "Failed to change password",
        description: err.response?.data.msg,
      });
    } else {
      toaster.error({ description: "Failed to change password" });
    }
    throw new Error();
  }
};
