import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useOrderPrintStore = create<OrderPrintStore>()(
  devtools((set) => ({
    totalCost: 0,
    orderPrintList: [],
    setOrderPrintList: (payload) => {
      set((state) => ({ orderPrintList: [...state.orderPrintList, payload] }));
    },
    setTotalCost: (totalCost) => {
      set({ totalCost: totalCost });
    }
  }))
);
