import { server, invoke } from './common';

export const homeService = {
  getUserInfo: () => invoke<number>(server.get('/api/user/remain-coins')),
  getSlide: () => invoke<SlideData[]>(server.get('/api/home/slides')),
  getOrder: () => invoke<OrderData[]>(server.get('/api/printRequest'))
};
