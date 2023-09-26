import { useState } from 'react';
import coin from '@assets/coin.png';
import { ToggleSidebarBtn } from './ToggleSidebarBtn';
import { useScreenSize } from '@hooks';
import { DesktopNavbar, SlideMenu } from '../navigation';
// Tue's task in here. Feel free to be creative, not strict, you can do anything.
export const AppNavigation: Component = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [coins] = useState<number>(200);
  const [menu, setMenu] = useState<string>('Home');
  // console.log(menu); // Do somthing with menu???
  const { screenSize } = useScreenSize();
  const handleOpenMenu = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className='w-full max-h-[768px] px-6 lg:px-9 py-3 lg:py-3 shadow-md lg:sticky my-3 lg:my-0'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center lg:hidden'>
          <div
            className='cursor-pointer opacity-40 focus:opacity-100 active:opacity-100 mr-4'
            onClick={handleOpenMenu}
          >
            <ToggleSidebarBtn open={openSidebar} />
          </div>
          <div className='text-2xl font-semibold'>{menu}</div>
        </div>
        {screenSize < 3 ? (
          <SlideMenu
            slideMenu={{
              openSideBar: openSidebar,
              closeMenu: handleOpenMenu,
              displayMenu: setMenu
            }}
          />
        ) : (
          <DesktopNavbar />
        )}
        <div className='flex items-center'>
          <div className='flex items-center w-18.25 lg:w-26 h-6 lg:h-9 bg-[#FEECDC] pl-4 pr-6 lg:pl-6 lg:pr-9 rounded-lg -mr-5 font-bold text-[#9F580A] lg:font-semibold lg:text-2xl select-none text-base'>
            {coins}
          </div>
          <img className='w-7 h-7 lg:w-10 lg:h-10' src={coin}></img>
          <div className='hidden lg:block lg:opacity-40 lg:ml-6 lg:cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 40 40'
              fill='none'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M36 20C36 24.2435 34.3143 28.3131 31.3137 31.3137C28.3131 34.3143 24.2435 36 20 36C15.7565 36 11.6869 34.3143 8.68629 31.3137C5.68571 28.3131 4 24.2435 4 20C4 15.7565 5.68571 11.6869 8.68629 8.68629C11.6869 5.68571 15.7565 4 20 4C24.2435 4 28.3131 5.68571 31.3137 8.68629C34.3143 11.6869 36 15.7565 36 20ZM24 14C24 15.0609 23.5786 16.0783 22.8284 16.8284C22.0783 17.5786 21.0609 18 20 18C18.9391 18 17.9217 17.5786 17.1716 16.8284C16.4214 16.0783 16 15.0609 16 14C16 12.9391 16.4214 11.9217 17.1716 11.1716C17.9217 10.4214 18.9391 10 20 10C21.0609 10 22.0783 10.4214 22.8284 11.1716C23.5786 11.9217 24 12.9391 24 14ZM20 22C18.0852 21.9996 16.2106 22.549 14.5988 23.5828C12.9871 24.6166 11.7061 26.0915 10.908 27.832C12.0334 29.1412 13.4285 30.1915 14.9979 30.911C16.5672 31.6304 18.2736 32.0019 20 32C21.7264 32.0019 23.4328 31.6304 25.0021 30.911C26.5715 30.1915 27.9666 29.1412 29.092 27.832C28.2939 26.0915 27.0129 24.6166 25.4012 23.5828C23.7894 22.549 21.9148 21.9996 20 22Z'
                fill='#495057'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
