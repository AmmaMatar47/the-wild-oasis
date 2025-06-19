import { toaster } from '@/components/ui/toaster';
import { http } from '../HttpService';
import { API_ENDPOINTS } from '@/utils/constants';

export interface UpdateSettingsRequestType {
  breakfastPrice: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
}

export interface SettingsType extends UpdateSettingsRequestType {
  id: number;
  created_at: string;
}

export const getSettings = async () => {
  const res = await http.request<SettingsType[]>('get', API_ENDPOINTS.settings);
  return res.data;
};

export const updateSettings = (settingsData: UpdateSettingsRequestType) => {
  // There's only one settings row in the server so no need for passing an id for the updateSettings function
  try {
    const res = http.request<SettingsType[]>('patch', API_ENDPOINTS.settings, {
      params: { id: 'eq.1' },
      data: settingsData,
    });
    toaster.success({ description: 'Settings updated successfully' });
    return res;
  } catch {
    toaster.error({ description: 'Failed to update settings' });
    throw new Error();
  }
};
