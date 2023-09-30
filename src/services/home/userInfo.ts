import { mockServer, invoke } from '@services/common';

export const userInfoService = {
  getUserInfo: () => invoke<UserInfoData>(mockServer.get('/user'))
};
