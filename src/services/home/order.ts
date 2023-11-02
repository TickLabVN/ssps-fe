import { server, invoke } from '@services/common';

export const orderService = {
  getOrder: () => invoke<OrderData[]>(server.get('/api/printRequest'))
};
