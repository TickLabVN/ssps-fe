type OrderStep = {
  current: number;
  prev: number;
};

type OrderWorkflowStore = {
  mobileOrderStep: OrderStep;
  desktopOrderStep: number;
  setMobileOrderStep: (mobileOrderStep: OrderStep) => void;
  setDesktopOrderStep: (desktopOrderStep: number) => void;
};
