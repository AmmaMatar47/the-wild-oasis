import { Params } from "react-router";
import { http } from "../HttpService";
import { API_ENDPOINTS } from "@/utils/constants";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";

export const getDataRange = async (
  endpoint: "cabins" | "bookings",
  customParam: Params | null,
) => {
  const countRes = await http.request<{ count: number }[]>(
    "get",
    `${API_ENDPOINTS.base}/${endpoint}`,
    {
      params: { select: "count", ...customParam },
    },
  );

  return countRes.data[0].count;
};

export const postImage = async (bucketName: string, file: Blob) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await http.request<{ Key: string }>(
      "post",
      `${API_ENDPOINTS.storage}/${bucketName.replaceAll(" ", "").toLowerCase()}`,
      {
        data: formData,
      },
    );
    console.log(res.request.responseURL);
    return res.request.responseURL as string;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err) {
        toaster.error({
          title: "Failed to upload image",
          description: `${err.response?.data.message}`,
        });
      }
    }
  }
};
