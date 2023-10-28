type OrderPrintStore = {
  totalCost: number;
  orderPrintList: Omit<OrderData, 'id'>[];
  setOrderPrintList: (payload: Omit<OrderData, 'id'>) => void;
  setTotalCost: (totalCost: number) => void;
};
