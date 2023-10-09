import { create } from 'zustand';

export const useOrderWorkflowStore = create<OrderWorkflowStore>()((set) => ({
  orderStep: 1,
  setOrderStep: (orderStep) => {
    set({ orderStep: orderStep });
  }
}));
