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
  size: number;
};

type OrderStore = {
  orderStatus: StoreStatus;
  orderData: OrderData[];
  totalSize: number;
  getOrderData: () => Promise<void>;
};
