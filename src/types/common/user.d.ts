type UserReturnValue = {
  id: string;
  userName: string;
};

type UserStore = {
  userStatus: StoreStatus;
  userData: UserReturnValue;
  getUserData: () => Promise<void>;
};
