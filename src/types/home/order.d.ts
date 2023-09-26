type OrderStatus = 'progressing' | 'ready' | 'done' | 'canceled';

type OrderData = {
  id: string;
  status: OrderStatus;
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
