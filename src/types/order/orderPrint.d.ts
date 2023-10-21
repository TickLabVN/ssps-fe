type OrderPrintStore = {
  totalCost: number;
  orderPrintList: OrderData[];
  setOrderPrintList: (orderPrintList: OrderData[]) => void;
  setTotalCost: (totalCost: number) => void;
};
