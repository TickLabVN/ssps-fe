import { create } from 'zustand';
import { coinExchangeService } from '@services/order';
export const useCoinExchangeStore = create<CoinExchangeStore>((set) => ({
  coinExchangeStatus: 'UNINIT',
  coinExchangeData: {
    coinToMoney: [],
    coinToPaper: []
  },
  getCoinExchangeData: async () => {
    set(() => ({ coinExchangeStatus: 'PENDING' }));
    try {
      const coinExchangeData = await coinExchangeService.getCoinExchange();
      set(() => ({ coinExchangeData: coinExchangeData, coinExchangeStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ coinExchangeStatus: 'REJECT' }));
    }
  }
}));
