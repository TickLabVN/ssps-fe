type OrderStatus = 'progressing' | 'ready' | 'done' | 'canceled';

type SlideData = {
  src: string;
  alt: string;
};

type OrderData = {
  id: string;
  status: OrderStatus;
  location: string;
  number: number;
  filesName: string[];
  pageNumber: number;
  coins: number;
  paid: string;
  size: number;
};

type HomeStore = {
  homeStatus: StoreStatus;
  userRemainCoins: number;
  slideData: SlideData[];
  orderData: OrderData[];
  getUserRemainCoins: () => Promise<void>;
  getSlideData: () => Promise<void>;
  getOrderData: () => Promise<void>;
};
