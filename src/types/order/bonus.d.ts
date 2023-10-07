type BonusData = {
  coins: number;
  money: string;
};
type BonusStore = {
  bonusStatus: StoreStatus;
  bonusData: BonusData;
  getBonusData: () => Promise<void>;
};
