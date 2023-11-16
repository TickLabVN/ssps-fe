import { apiClient, invoke } from './common';

export const homeService = {
  getRemainCoins: () => invoke(apiClient.GET('/api/user/remain-coins')),
  getSlides: () => invoke(apiClient.GET('/api/home/slides')),
  getOrders: () => invoke(apiClient.GET('/api/printRequest'))
};
