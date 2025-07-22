import { toaster } from '@/components/ui/toaster';
import { http } from '../HttpService';
import axios, { isAxiosError } from 'axios';
import { API_ENDPOINTS } from '@/utils/constants';
import { CabinResponseType, CabinType } from '@/types/cabinsTypes';
import { deleteUnusedImage, postImage } from './indexApi';

export const getCabinsNames = async () => {
  const res = await http.request<CabinResponseType[]>('get', API_ENDPOINTS.cabins, {
    params: { select: 'name' },
  });

  return res.data;
};

export const getCabinById = async (id: string) => {
  const res = await http.request<CabinType[]>('get', API_ENDPOINTS.cabins, {
    params: {
      id: `eq.${id}`,
      select: 'description,discount,image,maxCapacity,name,regularPrice',
    },
  });
  return res.data.at(0);
};

export const getCabins = async (order: string, discount: string, range: string) => {
  const res = await http.request<CabinResponseType[]>('get', API_ENDPOINTS.cabins, {
    params:
      discount === 'All'
        ? { order: `${order},created_at.asc` }
        : { order: order, discount: discount },
    headers: {
      range,
    },
  });

  return res.data;
};

export const createCabin = async (body: CabinType, bucketName?: string) => {
  try {
    // Giving the toaster an id so that I can dismiss it
    let imagePath;
    if (bucketName) {
      imagePath = await postImage(bucketName, body.image as Blob);
    }

    await http.request<void>('post', API_ENDPOINTS.cabins, {
      data: { ...body, image: imagePath || body.image },
    });

    toaster.success({
      description: 'Cabin created successfully',
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toaster.error({
        title: 'Failed to create cabin',
        description: `${err.response?.data.message}`,
      });
    } else {
      toaster.error({
        description: `Failed to create cabin`,
      });
    }
    throw new Error();
  }
};

export const editCabin = async (
  id: string | number,
  body: Partial<CabinType>,
  bucketName?: string,
  oldImage?: string
) => {
  try {
    let imagePath;
    if (bucketName) {
      // Post new image
      imagePath = await postImage(bucketName, body.image as Blob);
    }

    http.request<void>('patch', API_ENDPOINTS.cabins, {
      params: {
        id: `eq.${id}`,
      },
      data: { ...body, image: imagePath || body.image },
    });
    // Delete old image
    if (oldImage) {
      deleteUnusedImage(oldImage, API_ENDPOINTS.cabins);
    }

    toaster.success({
      description: 'Cabin edited successfully',
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toaster.error({
        title: 'Failed to edit cabin',
        description: `${err.response?.data.message}`,
      });
    } else {
      toaster.error({
        description: `Failed to edit cabin`,
      });
    }
    throw new Error();
  }
};

export const deleteCabin = async (cabinId: string | number, imagePath: string) => {
  try {
    toaster.loading({ description: 'Deleting', id: 'deleting' });
    const res = await http.request<void>('delete', API_ENDPOINTS.cabins, {
      params: { id: `eq.${cabinId}` },
    });
    deleteUnusedImage(imagePath, API_ENDPOINTS.cabins);
    toaster.success({ description: 'Cabin deleted successfully' });

    return res;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.data.code == 23503) {
        toaster.error({
          title: 'Failed to delete cabin',
          description: `You can't delete this cabin because it’s still associated with one or more bookings.`,
        });
      } else {
        toaster.error({ description: 'Failed to delete cabin' });
      }
    }
    throw new Error();
  } finally {
    toaster.dismiss('deleting');
  }
};
