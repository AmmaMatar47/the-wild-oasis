import { toaster } from '@/components/ui/toaster';
import { http, httpStorage } from '../HttpService';
import { AxiosResponse } from 'axios';

export interface CabinType {
  description: string;
  discount: number;
  image: string | ImageFileType;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
export interface CabinResponseType extends CabinType {
  id: number;
  created_at: Date;
  image: string;
}

export interface ImageFileType extends Blob {
  name: string;
  size: number;
  type: string;
}

export const getCabins = async (order: string, discount: string, range: string) => {
  const res = await http.request<CabinResponseType[]>('get', `/cabins`, {
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

  httpStorage.request<{ Key: string }>('post', bucketName, {
    data: formData,
  });
};

export const createCabin = (body: CabinType, bucketName?: string, file?: Blob) => {
  if (bucketName && file) {
    postImage(bucketName, file);
  }

  const createCabinRes = http.request<''>('post', '/cabins', {
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

  const res = http.request<''>('patch', `/cabins`, {
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
  httpStorage.request<''>('delete', imagePath);
  const res = http.request<AxiosResponse<''>>('delete', '/cabins', {
    params: { id: `eq.${cabinId}` },
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
