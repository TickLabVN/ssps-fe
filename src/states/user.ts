import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { userService } from '@services';

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    userStatus: 'UNINIT',
    userData: {
      id: '',
      userName: ''
    },
    getUserData: async () => {
      set(() => ({ userStatus: 'PENDING' }));
      try {
        const userData = await userService.getInfo();
        set(() => ({ userData: userData, userStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ userStatus: 'REJECT' }));
      }
    }
  }))
);
