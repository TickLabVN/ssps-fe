import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    userInfo: null,
    updateUserInfo: (data) => set({ userInfo: data })
  }))
);
