import { create } from 'zustand';

export const useOrderPrintStore = create<OrderPrintStore>()((set) => ({
  totalCost: 0,
  orderPrintList: [],
  setOrderPrintList: (payload) => {
    set((state) => ({ orderPrintList: [...state.orderPrintList, payload] }));
  },
  setTotalCost: (totalCost) => {
    set({ totalCost: totalCost });
  }
}));
