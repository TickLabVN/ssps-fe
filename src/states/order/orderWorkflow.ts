import { create } from 'zustand';

export const useOrderWorkflowStore = create<OrderWorkflowStore>()((set) => ({
  openMobileOrderWorkflow: false,
  openDesktopOrderWorkflow: false,
  mobileOrderStep: 0,
  desktopOrderStep: 0,
  setOpenMobileOrderWorkflow: (payload) => {
    set({ openMobileOrderWorkflow: payload });
  },
  setOpenDesktopOrderWorkflow: (payload) => {
    set({ openDesktopOrderWorkflow: payload });
  },
  setMobileOrderStep: (mobileOrderStep) => {
    set({ mobileOrderStep: mobileOrderStep });
  },
  setDesktopOrderStep: (desktopOrderStep) => {
    set({ desktopOrderStep: desktopOrderStep });
  }
}));
