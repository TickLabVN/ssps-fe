import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { orderExtraService } from '@services/order';

export const useOrderExtraStore = create<OrderExtraStore>()(
  devtools((set) => ({
    extraStatus: 'UNINIT',
    extraFeeData: {
      extraFee: 0
    },
    getOrderExtraData: async () => {
      set(() => ({ extraStatus: 'PENDING' }));
      try {
        const extraFeeData = await orderExtraService.getOrderExtra();
        set(() => ({ extraFeeData: extraFeeData, extraStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ extraStatus: 'REJECT', extraFeeData: { extraFee: 3 } }));
      }
    }
  }))
);
