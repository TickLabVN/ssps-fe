import { mockServer, invoke } from '@services/common';

export const orderExtraService = {
  getOrderExtra: () => invoke<OrderExtra>(mockServer.get('/system'))
};
