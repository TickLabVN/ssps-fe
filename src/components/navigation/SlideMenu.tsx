import { AppDrawer, ToggleSidebarBtn } from '@components/common';
import { useState } from 'react';
import { List, ListItem } from '@material-tailwind/react';
import logo from '@assets/logobk.png';
import ticklab from '@assets/ticklab.png';
export const SlideMenu: Component<{ slideMenu: SlideMenuData }> = ({ slideMenu }) => {
  const { openSideBar, closeMenu, displayMenu } = slideMenu;
  const [itemClassName] = useState<string>(
    "hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold h-14 px-6 py-4 rounded-none text-gray/4 font-medium'"
  );
  const [homeStyle, setHomeStyle] = useState<boolean>(true);
  const handleHomeStyle = () => {
    setHomeStyle(false);
  };
  const handleSetMenu = (menu: string | null) => {
    menu && displayMenu(menu);
    handleHomeStyle();
  };
  return (
    <AppDrawer open={openSideBar} onClose={closeMenu}>
      <>
        <div className='h-11 pt-4 px-6 flex items-center gap-1 self-stretch'>
          <div
            className='cursor-pointer opacity-40 focus:opacity-100 active:opacity-100 mr-4'
            onClick={closeMenu}
          >
            <ToggleSidebarBtn open={openSideBar} />
          </div>
          <div className='flex'>
            <img className='w-7 h-7 mr-2' src={logo}></img>
            <img className='w-7 h-7' src={ticklab}></img>
          </div>
        </div>
        <div className='min-h-[90%] mt-10 flex flex-col justify-between pb-4'>
          <List className='p-0'>
            <a href='#' className='text-initial '>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={
                  homeStyle
                    ? itemClassName + ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                    : itemClassName
                }
              >
                Home
              </ListItem>
            </a>
            <a href='#' className='text-initial'>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={itemClassName}
              >
                My order
              </ListItem>
            </a>
            <a href='#' className='text-initial'>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={itemClassName}
              >
                Payment
              </ListItem>
            </a>
            <a href='#' className='text-initial'>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={itemClassName}
              >
                Location
              </ListItem>
            </a>
          </List>
          <List className='p-0'>
            <a href='#' className='text-initial '>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={itemClassName}
              >
                Help Center
              </ListItem>
            </a>
            <a href='#' className='text-initial'>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={itemClassName}
              >
                Setting
              </ListItem>
            </a>
            <a href='#' className='text-initial'>
              <ListItem
                onClick={(e) => handleSetMenu((e.target as HTMLElement).textContent)}
                className={itemClassName + ' font-bold'}
              >
                Log out
              </ListItem>
            </a>
          </List>
        </div>
      </>
    </AppDrawer>
  );
};
