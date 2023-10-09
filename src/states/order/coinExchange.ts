import { create } from 'zustand';
import { coinExchangeService } from '@services/order';
export const useCoinExchangeStore = create<CoinExchangeStore>((set) => ({
  coinExchangeStatus: 'UNINIT',
  coinExchangeData: {
    coinToMoney: {
      coins: 0,
      amounts: 0
    },
    coinToPaper: {
      coins: 0,
      amounts: 0
    }
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
