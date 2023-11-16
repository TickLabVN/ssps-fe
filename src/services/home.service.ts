import { apiClient, invoke } from './common';

export const homeService = {
  getSlides: () => invoke(apiClient.GET('/api/home/slides'))
};
