import { toaster } from '@/components/ui/toaster';
import { http } from '../HttpService';
import { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '@/utils/constants';
import { CabinResponseType, CabinType } from '@/types/cabinsTypes';

export const getAllCabins = async () => {
  const res = await http.request<CabinResponseType[]>('get', API_ENDPOINTS.cabins);

  return res.data;
};

export const getCabins = async (order: string, discount: string, range: string) => {
  const res = await http.request<CabinResponseType[]>('get', API_ENDPOINTS.cabins, {
    params: discount === 'All' ? { order: order } : { order: order, discount: discount },
    headers: {
      range,
    },
  });

  return res.data;
};

const postImage = (bucketName: string, file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  http.request<{ Key: string }>('post', `${API_ENDPOINTS.storage}/${bucketName}`, {
    data: formData,
  });
};

export const createCabin = (body: CabinType, bucketName?: string, file?: Blob) => {
  if (bucketName && file) {
    postImage(bucketName, file);
  }

  const createCabinRes = http.request<''>('post', API_ENDPOINTS.cabins, {
    data: body,
  });

  toaster.promise(createCabinRes, {
    success: {
      description: 'Cabin created successfully',
    },
    error: { description: 'Cabin could not be created' },
    loading: { description: 'Uploading...' },
  });
  return createCabinRes;
};

export const editCabin = (
  id: number,
  body: Partial<CabinType>,
  bucketName?: string,
  file?: Blob
) => {
  if (bucketName && file) {
    postImage(bucketName, file);
  }

  const res = http.request<''>('patch', API_ENDPOINTS.cabins, {
    params: {
      id: `eq.${id}`,
    },
    data: body,
  });

  toaster.promise(res, {
    success: {
      description: 'Cabin edited successfully',
    },
    loading: {
      description: 'Editing cabin',
    },
    error: {
      description: 'Failed to edit cabin',
    },
  });
  return res;
};

export const deleteCabin = (cabinId: number, imagePath: string) => {
  const res = http
    .request<AxiosResponse<''>>('delete', API_ENDPOINTS.cabins, {
      params: { id: `eq.${cabinId}` },
    })
    .then(() => {
      http.request<''>('delete', imagePath);
    });
  toaster.promise(res, {
    success: {
      description: 'Cabin deleted successfully',
    },
    error: { description: 'Cabin failed to delete' },
    loading: { description: 'Deleting' },
  });
  return res;
};
