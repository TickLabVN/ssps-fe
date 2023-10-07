import { mockServer, invoke } from '@services/common';

export const coinExchangeService = {
  getCoinExchange: () => invoke<CoinExchangeData>(mockServer.get('/coinExChange'))
};
