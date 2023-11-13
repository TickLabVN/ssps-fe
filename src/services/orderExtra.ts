import { mockServer, invoke } from './common';

export const orderExtraService = {
  getOrderExtra: () => invoke<OrderExtra>(mockServer.get('/system'))
};
