import { useMemo, useState } from 'react';
import { AppDrawer } from './AppDrawer';
//import { ToggleSidebarBtn } from "./ToggleSidebarBtn";

// Tue's task in here. Feel free to be creative, not strict, you can do anything.
export const AppNavigation: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  console.log(menu); // Do somthing with menu???

  const SideMenu = useMemo(() => <></>, []);

  return (
    <AppDrawer open={openSidebar} onClose={() => setOpenSidebar(false)}>
      {SideMenu}
    </AppDrawer>
  );
};
