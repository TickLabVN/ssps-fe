type OrderWorkflowStore = {
  openMobileOrderWorkflow: boolean;
  openDesktopOrderWorkflow: boolean;
  mobileOrderStep: number;
  desktopOrderStep: number;
  setOpenMobileOrderWorkflow: (payload: boolean) => void;
  setOpenDesktopOrderWorkflow: (payload: boolean) => void;
  setMobileOrderStep: (mobileOrderStep: number) => void;
  setDesktopOrderStep: (desktopOrderStep: number) => void;
};
