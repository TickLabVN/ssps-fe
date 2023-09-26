import { List, ListItem } from '@material-tailwind/react';
import { useState } from 'react';
import logo from '@assets/logobk.png';
import ticklab from '@assets/ticklab.png';
export const DesktopNavbar: Component = () => {
  const [itemClassName] = useState<string>(
    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold px-6 py-3 text-gray/4 font-medium rounded-lg text-2xl leading-9 ml-6 w-fit text-center'
  );
  const [homeStyle, setHomeStyle] = useState<boolean>(true);
  const handleHomeStyle = () => {
    setHomeStyle(false);
  };
  return (
    <>
      <div className='flex'>
        <div className='max-w-[60px] max-h-[60px] ml-0 mr-3 object-cover'>
          <img className='w-full h-full' src={logo}></img>
        </div>
        <div className='max-w-[60px] max-h-[60px] ml-0 mr-3 object-cover'>
          <img className='w-full h-full' src={ticklab}></img>
        </div>
        <List className='p-0 flex-row -ml-3 max-w-[calc(100%-36px)]'>
          <a href='#'>
            <ListItem
              className={
                homeStyle
                  ? itemClassName + ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                  : itemClassName
              }
            >
              Home
            </ListItem>
          </a>
          <a href='#'>
            <ListItem className={itemClassName} onClick={handleHomeStyle}>
              My order
            </ListItem>
          </a>
          <a href='#'>
            <ListItem className={itemClassName} onClick={handleHomeStyle}>
              Payment
            </ListItem>
          </a>
          <a href='#'>
            <ListItem className={itemClassName} onClick={handleHomeStyle}>
              Location
            </ListItem>
          </a>
        </List>
      </div>
    </>
  );
};
