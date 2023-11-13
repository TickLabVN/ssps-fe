type OrderWorkflowStore = {
  mobileOrderStep: number;
  desktopOrderStep: number;
  setMobileOrderStep: (mobileOrderStep: number) => void;
  setDesktopOrderStep: (desktopOrderStep: number) => void;
};
