import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { userInfoService } from '@services/home';

export const useUserInfoStore = create<UserInfoStore>()(
  devtools((set) => ({
    userInfoStatus: 'UNINIT',
    userInfoData: {
      coins: 0
    },
    getUserInfoData: async () => {
      set(() => ({ userInfoStatus: 'PENDING' }));
      try {
        const userInfoData = await userInfoService.getUserInfo();
        set(() => ({ userInfoData: userInfoData, userInfoStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ userInfoStatus: 'REJECT' }));
      }
    }
  }))
);
