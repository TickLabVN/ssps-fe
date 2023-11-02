type UserInfoStore = {
  userInfoStatus: StoreStatus;
  userInfoData: number;
  getUserInfoData: () => Promise<void>;
};
