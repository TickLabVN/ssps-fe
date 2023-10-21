import { create } from 'zustand';

export const useOrderPrintStore = create<OrderPrintStore>()((set) => ({
  totalCost: 0,
  orderPrintList: [],
  setOrderPrintList: (orderPrintList) => {
    set({ orderPrintList: orderPrintList });
  },
  setTotalCost: (totalCost) => {
    set({ totalCost: totalCost });
  }
}));
