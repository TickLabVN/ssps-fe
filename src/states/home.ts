import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { homeService } from '@services';

export const useHomeStore = create<HomeStore>()(
  devtools((set) => ({
    homeStatus: 'UNINIT',
    userRemainCoins: 0,
    slideData: [],
    orderData: [],
    getUserRemainCoins: async () => {
      set(() => ({ homeStatus: 'PENDING' }));
      try {
        const coins = await homeService.getUserInfo();
        set(() => ({ userRemainCoins: coins, homeStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ homeStatus: 'REJECT' }));
      }
    },
    getSlideData: async () => {
      set(() => ({ homeStatus: 'PENDING' }));
      try {
        const slideData = await homeService.getSlide();
        set(() => ({ slideData: slideData, homeStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ homeStatus: 'REJECT' }));
      }
    },
    getOrderData: async () => {
      set(() => ({ homeStatus: 'PENDING' }));
      try {
        const orderData = await homeService.getOrder();
        set(() => ({ orderData: orderData, homeStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ homeStatus: 'REJECT' }));
      }
    }
  }))
);
