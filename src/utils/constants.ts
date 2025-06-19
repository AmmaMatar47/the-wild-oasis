export const API_ENDPOINTS = {
  base: '/rest/v1',
  storage: '/storage/v1',
  auth: '/auth/v1',

  // Server tables
  cabins: `/rest/v1/cabins`,
  bookings: `/rest/v1/bookings`,
  guests: `/rest/v1/guests`,
  settings: `/rest/v1/settings`,
  users: {
    user: `/auth/v1/user`,
    token: `/auth/v1/token`,
    signup: `/auth/v1/signup`,
    logout: `/auth/v1/logout`,
  },
};

export const CABINS_PAGE_SIZE = 6;

export const BOOKINGS_PAGE_SIZE = 6;

export const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
