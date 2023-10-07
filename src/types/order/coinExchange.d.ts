type CoinToMoney = {
  coins: number;
  amounts: string;
};
type CoinToPaper = {
  coins: number;
  amounts: string;
};
type CoinExchangeData = {
  coinToMoney: CoinToMoney[];
  coinToPaper: CoinToPaper[];
};

type CoinExchangeStore = {
  coinExchangeStatus: StoreStatus;
  coinExchangeData: CoinExchangeData;
  getCoinExchangeData: () => Promise<void>;
};
