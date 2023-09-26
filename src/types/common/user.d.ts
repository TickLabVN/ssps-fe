type UserReturnValue = {
  id: string;
  email: string;
};

type UserStore = {
  userStatus: StoreStatus;
  userData: UserReturnValue;
  getUserData: () => Promise<void>;
};
