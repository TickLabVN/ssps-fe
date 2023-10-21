import { create } from 'zustand';

export const useOrderWorkflowStore = create<OrderWorkflowStore>()((set) => ({
  mobileOrderStep: 0,
  desktopOrderStep: 0,
  setMobileOrderStep: (mobileOrderStep) => {
    set({ mobileOrderStep: mobileOrderStep });
  },
  setDesktopOrderStep: (desktopOrderStep) => {
    set({ desktopOrderStep: desktopOrderStep });
  }
}));
