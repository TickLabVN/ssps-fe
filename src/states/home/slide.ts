import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { slideService } from '@services/home';

export const useSlideStore = create<SlideStore>()(
  devtools((set) => ({
    slideStatus: 'UNINIT',
    slideData: [],
    getSlideData: async () => {
      set(() => ({ slideStatus: 'PENDING' }));
      try {
        const slideData = await slideService.getSlide();
        set(() => ({ slideData: slideData, slideStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ slideStatus: 'REJECT' }));
      }
    }
  }))
);
