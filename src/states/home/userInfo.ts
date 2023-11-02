import { create } from 'zustand';
import { userInfoService } from '@services/home';

export const useUserInfoStore = create<UserInfoStore>()((set) => ({
  userInfoStatus: 'UNINIT',
  userInfoData: 0,
  getUserInfoData: async () => {
    set(() => ({ userInfoStatus: 'PENDING' }));
    try {
      const userInfoData = await userInfoService.getUserInfo();
      set(() => ({ userInfoData: userInfoData, userInfoStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ userInfoStatus: 'REJECT' }));
    }
  }
}));
