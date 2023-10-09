type BonusData = {
  coins: number;
  money: number;
};
type BonusStore = {
  bonusStatus: StoreStatus;
  bonusData: BonusData;
  getBonusData: () => Promise<void>;
};
