import { server, invoke } from './common';

export const userService = {
  getInfo: () => invoke<UserReturnValue>(server.get('/api/user'))
};
