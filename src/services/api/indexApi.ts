import { Params } from "react-router";
import { http } from "../HttpService";
import { API_ENDPOINTS } from "@/utils/constants";

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
