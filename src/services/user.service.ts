import { apiClient, invoke } from './common';

export const userService = {
  getInfo: () => invoke(apiClient.GET('/api/user')),
  getRemainCoins: () => invoke(apiClient.GET('/api/user/remainCoins'))
};
