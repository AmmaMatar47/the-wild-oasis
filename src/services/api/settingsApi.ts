import { toaster } from '@/components/ui/toaster';
import { http } from '../HttpService';

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
  const res = await http.request<SettingsType[]>('get', '/settings');
  return res.data;
};

export const updateSettings = (settingsData: UpdateSettingsRequestType) => {
  // There's only one settings row in the server so no need for passing an id for the updateSettings function
  const res = http.request<SettingsType[]>('patch', '/settings', {
    params: { id: 'eq.1' },
    data: settingsData,
  });

  toaster.promise(res, {
    error: { description: 'failed to update settings' },
    loading: { description: 'Updating settings' },
    success: { description: 'Settings updated successfully' },
  });

  return res;
};
