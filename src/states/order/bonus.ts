import { create } from 'zustand';
import { bonusService } from '@services/order';
export const useBonusStore = create<BonusStore>()((set) => ({
  bonusStatus: 'UNINIT',
  bonusData: {
    coins: 0,
    money: 0
  },
  getBonusData: async () => {
    set(() => ({ bonusStatus: 'PENDING' }));
    try {
      const bonusData = await bonusService.getBonusData();
      set(() => ({ bonusData: bonusData, bonusStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ bonusStatus: 'REJECT' }));
    }
  }
}));
