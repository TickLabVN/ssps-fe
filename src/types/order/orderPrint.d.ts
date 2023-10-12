type OrderPrintData = {
  id: string;
  status: string;
  location: string;
  number: number;
  fileName: string;
  pageNumber: number;
  coins: number;
  paid: string;
  size: number;
};

type OrderPrintStore = {
  totalCost: number;
  orderPrintList: OrderPrintData[];
  setOrderList: (orderPrintList: OrderPrintData[]) => void;
  setCost: (totalCost: number) => void;
};
