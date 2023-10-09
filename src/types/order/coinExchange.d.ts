type CoinToMoney = {
  coins: number;
  amounts: number;
};
type CoinToPaper = {
  coins: number;
  amounts: number;
};
type CoinExchangeData = {
  coinToMoney: CoinToMoney;
  coinToPaper: CoinToPaper;
};

type CoinExchangeStore = {
  coinExchangeStatus: StoreStatus;
  coinExchangeData: CoinExchangeData;
  getCoinExchangeData: () => Promise<void>;
};
