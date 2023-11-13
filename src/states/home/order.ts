import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { orderService } from '@services/home';

export const useOrderStore = create<OrderStore>()(
  devtools((set) => ({
    orderStatus: 'UNINIT',
    orderData: [],
    totalSize: 0,
    getOrderData: async () => {
      set(() => ({ orderStatus: 'PENDING' }));
      try {
        const orderData = await orderService.getOrder();
        const totalSize = orderData.reduce((total, order) => total + order.size, 0);
        set(() => ({ orderData: orderData, totalSize: totalSize, orderStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ orderStatus: 'REJECT' }));
      }
    }
  }))
);
