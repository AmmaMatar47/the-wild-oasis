import { Params } from "react-router";
import { http } from "../HttpService";

export const getDataRange = async (
  endpoint: "cabins" | "bookings",
  customParam: Params | null,
) => {
  const countRes = await http.request<{ count: number }[]>("get", endpoint, {
    params: { select: "count", ...customParam },
  });

  return countRes.data[0].count;
};
