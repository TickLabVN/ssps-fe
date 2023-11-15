import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useOrderWorkflowStore = create<OrderWorkflowStore>()(
  devtools((set) => ({
    mobileOrderStep: 0,
    desktopOrderStep: 0,
    setMobileOrderStep: (mobileOrderStep) => {
      set(() => ({ mobileOrderStep: mobileOrderStep }));
    },
    setDesktopOrderStep: (desktopOrderStep) => {
      set(() => ({ desktopOrderStep: desktopOrderStep }));
    }
  }))
);
