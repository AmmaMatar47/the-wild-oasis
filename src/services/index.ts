import { http } from './HttpService';

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

export const getAllCabins = async () => {
  const res = http.request<CabinType[]>('get', '/cabins');
  return res;
};
