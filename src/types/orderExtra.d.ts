type OrderExtra = {
  extraFee: number;
};

type OrderExtraStore = {
  extraStatus: StoreStatus;
  extraFeeData: OrderExtra;
  getOrderExtraData: () => Promise<void>;
};
