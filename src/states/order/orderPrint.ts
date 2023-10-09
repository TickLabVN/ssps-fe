import { create } from 'zustand';
// import { useOrderStore } from "@states/home";

export const useOrderPrintStore = create<OrderPrintStore>()((set) => ({
  totalCost: 0,
  orderPrintList: [],
  setOrderList: (orderPrintList) => {
    set({ orderPrintList: orderPrintList });
  },
  setCost: (totalCost) => {
    set({ totalCost: totalCost });
  }
}));
