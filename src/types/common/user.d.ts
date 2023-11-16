type UserInfo = {
  id: string;
  userName: string;
};

type UserStore = {
  userInfo: UserInfo | null;
  updateUserInfo: (data: UserInfo) => void;
};
