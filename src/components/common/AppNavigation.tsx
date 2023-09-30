import { UserCircleIcon } from '@heroicons/react/24/solid';
import coin from '@assets/coin.png';
import { AppDrawer, DesktopNavbar, ToggleSidebarBtn, useSidebarMenu } from '@components/common';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useMenuBarStore } from '@states/common';
import { useUserInfoStore } from '@states/home';

export const AppNavigation: Component<{ mainMenu: RouteMenu; subMenu: RouteMenu }> = ({
  mainMenu,
  subMenu
}) => {
  const { screenSize } = useScreenSize();
  const { openSidebar, handleOpenSidebar, SidebarMenu } = useSidebarMenu();
  const { selectedMenu } = useMenuBarStore();
  const { userInfoData } = useUserInfoStore();

  return (
    <div className='w-full max-h-[768px] px-6 lg:px-9 py-3 lg:py-3 shadow-md lg:sticky my-3 lg:my-0'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center lg:hidden'>
          <div
            className='cursor-pointer opacity-40 focus:opacity-100 active:opacity-100 mr-4'
            onClick={handleOpenSidebar}
          >
            <ToggleSidebarBtn open={openSidebar} />
          </div>
          <div className='text-2xl font-semibold'>{selectedMenu}</div>
        </div>
        {screenSize < ScreenSize.LG ? (
          <AppDrawer open={openSidebar} onClose={handleOpenSidebar}>
            <SidebarMenu mainMenu={mainMenu} subMenu={subMenu} />
          </AppDrawer>
        ) : (
          <DesktopNavbar mainMenu={mainMenu} />
        )}
        <div className='flex items-center'>
          <div className='flex items-center w-18.25 lg:w-26 h-6 lg:h-9 bg-[#FEECDC] pl-4 pr-6 lg:pl-6 lg:pr-9 rounded-lg -mr-5 font-bold text-[#9F580A] lg:font-semibold lg:text-2xl select-none text-base'>
            {userInfoData.coins}
          </div>
          <img className='w-7 h-7 lg:w-10 lg:h-10' src={coin}></img>
          <UserCircleIcon className='w-10 h-10 hidden lg:block lg:opacity-40 lg:ml-6 lg:cursor-pointer' />
        </div>
      </div>
    </div>
  );
};
