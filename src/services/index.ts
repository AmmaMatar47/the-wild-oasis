import { http, httpStorage } from "./HttpService";

export interface CabinType {
  created_at: Date;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export interface ImageFileType extends Blob {
  name: string;
  size: number;
  type: string;
}
export interface NewCabinValues {
  description: string;
  discount: number;
  image: string | ImageFileType;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export const getCabins = async (params: {
  order?: string;
  discount?: string;
}) => {
  const res = await http.request<CabinType[]>("get", `/cabins`, {
    params: params,
  });
  return res.data;
};

export const deleteCabin = (cabinId: number, imagePath: string) => {
  httpStorage.request("delete", imagePath);
  const res = http.request("delete", "/cabins", {
    params: { id: `eq.${cabinId}` },
  });
  return res;
};

export const createCabin = async (
  body: NewCabinValues,
  bucketName: string,
  file: Blob,
) => {
  const formData = new FormData();
  formData.append("file", file);

  httpStorage.request<{ Key: string }>("post", bucketName, {
    data: formData,
  });

  return http.request<CabinType>("post", "/cabins", {
    data: {
      ...body,
      image: `${import.meta.env.VITE_WILD_OASIS_STORAGE_URL}/${bucketName}`,
    },
  });
};
