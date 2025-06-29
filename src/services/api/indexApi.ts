import { Params } from 'react-router';
import { http } from '../HttpService';
import { API_ENDPOINTS } from '@/utils/constants';

export const getDataRange = async (endpoint: 'cabins' | 'bookings', customParam: Params | null) => {
  const countRes = await http.request<{ count: number }[]>(
    'get',
    `${API_ENDPOINTS.base}/${endpoint}`,
    {
      params: { select: 'count', ...customParam },
    }
  );

  return countRes.data[0].count;
};

export const postImage = async (bucketName: string, file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await http.request<{ Key: string }>(
    'post',
    `${API_ENDPOINTS.storage}/${bucketName.replaceAll(' ', '').toLowerCase()}`,
    {
      data: formData,
    }
  );
  return res.request.responseURL as string;
};

export const deleteUnusedImage = async (imagePath: string, endpoint: string) => {
  // This request if for filtering if any item in the table uses the same image
  const res = await http.request<string[]>('get', endpoint, {
    params: {
      select: 'image',
      image: `eq.${imagePath}`,
    },
  });
  const rowsWithSameImg = res.data;
  //  "rowsWithSameImg.length === 0" makes the delete request happen when no item in the table uses the imagePath
  // That means you need to call the deleteUnusedImage function after the successful delete of the item in the server
  if (rowsWithSameImg.length === 0) {
    http.request<void>('delete', imagePath);
  }

  return rowsWithSameImg;
};
