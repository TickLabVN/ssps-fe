type OrderData = {
  id: string;
  status: string;
  location: string;
  number: number;
  fileName: string;
  pageNumber: number;
  coins: number;
  paid: string;
};

type OrderStore = {
  orderStatus: StoreStatus;
  orderData: OrderData[];
  getOrderData: () => Promise<void>;
};
