import { invoke, server } from '@services/common';

export const slideService = {
  getSlide: () => invoke<SlideData[]>(server.get('/api/home/slides'))
};
