import { mockServer, invoke } from '@services/common';

export const slideService = {
  getSlide: () => invoke<SlideData[]>(mockServer.get('/slides'))
};
