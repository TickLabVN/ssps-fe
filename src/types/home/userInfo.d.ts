type UserInfoData = {
  coins: number;
};

type UserInfoStore = {
  userInfoStatus: StoreStatus;
  userInfoData: UserInfoData;
  getUserInfoData: () => Promise<void>;
};
