type SlideMenuData = {
  openSideBar: boolean;
  closeMenu: () => void;
  displayMenu: React.Dispatch<React.SetStateAction<string>>;
};
