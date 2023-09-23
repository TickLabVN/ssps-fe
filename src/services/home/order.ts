import { mockServer, invoke } from '../common/common';

export const orderService = {
  getOrder: () => invoke<OrderData[]>(mockServer.get('/orders'))
};
