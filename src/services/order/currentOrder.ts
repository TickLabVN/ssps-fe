import { mockServer, invoke } from '@services/common';

export const curentOrderService = {
  getOrder: () => invoke<OrderData>(mockServer.get('/order'))
};
