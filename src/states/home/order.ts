import { create } from 'zustand';
import { orderService } from '@services/home';

export const useOrderStore = create<OrderStore>()((set) => ({
  orderStatus: 'UNINIT',
  orderData: [],
  getOrderData: async () => {
    set(() => ({ orderStatus: 'PENDING' }));
    try {
      const orderData = await orderService.getOrder();
      set(() => ({ orderData: orderData, orderStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ orderStatus: 'REJECT' }));
    }
  }
}));
