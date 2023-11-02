import { server, invoke } from '@services/common';

export const userInfoService = {
  getUserInfo: () => invoke<number>(server.get('/api/user/remain-coins'))
};
