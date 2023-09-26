import { mockServer, invoke } from '@services/common';

export const orderService = {
  getOrder: () => invoke<OrderData[]>(mockServer.get('/orders'))
};
