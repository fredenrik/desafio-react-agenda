export const API_CONFIG = {
  BASE_URL: '/api',
  TIMEOUT: 10000,
} as const;

export const ENDPOINTS = {
  USERS: `${API_CONFIG.BASE_URL}/users`,
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 6,
  PAGE_SIZE_OPTIONS: [10, 20, 50],
} as const;
