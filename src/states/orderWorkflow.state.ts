import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useOrderWorkflowStore = create<OrderWorkflowStore>()(
  devtools((set) => ({
    mobileOrderStep: {
      current: 0,
      prev: -1
    },
    desktopOrderStep: 2,
    setMobileOrderStep: (mobileOrderStep) => {
      set({ mobileOrderStep: mobileOrderStep });
    },
    setDesktopOrderStep: (desktopOrderStep) => {
      set({ desktopOrderStep: desktopOrderStep });
    }
  }))
);
