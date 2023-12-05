import { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dialog, DialogBody, DialogHeader, Typography, Button } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { AppNavigation } from '@components/common';
import { useAuthMutation, useListenEvent } from '@hooks';

export const AppLayout: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { logout } = useAuthMutation();

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  const routeItems = useMemo(() => {
    const mainItem: RouteMenu = [];
    const subItem: RouteMenu = [];
    const items: { path: string; element: React.ReactElement }[] = [];

    for (const menuItem of menu) {
      if (menuItem.type === 'logout-btn') {
        subItem.push({ type: menuItem.type, name: menuItem.name, onClick: menuItem.onClick });
        continue;
      }

      items.push({ path: menuItem.path, element: menuItem.element });
      if (menuItem.type === 'main-item') {
        mainItem.push({
          type: menuItem.type,
          name: menuItem.name,
          path: menuItem.path,
          element: menuItem.element
        });
      }
      if (menuItem.type === 'sub-item') {
        subItem.push({
          type: menuItem.type,
          name: menuItem.name,
          path: menuItem.path,
          element: menuItem.element
        });
      }
    }
    return {
      items,
      mainItem,
      subItem
    };
  }, [menu]);

  useListenEvent('logout', handleOpenDialog);

  return (
    <div className='flex flex-col h-screen sm:min-h-screen'>
      <AppNavigation mainMenu={routeItems.mainItem} subMenu={routeItems.subItem} />
      <div className='lg:p-4 flex-1 h-100vh bg-gray-200'>
        <Routes>
          {routeItems.items.map((item) => (
            <Route path={item.path} element={item.element} key={item.path} />
          ))}
        </Routes>
      </div>
      <Dialog open={openDialog} handler={handleOpenDialog}>
        <DialogHeader className='flex justify-end -mb-5'>
          <XMarkIcon width={28} className='cursor-pointer' onClick={handleOpenDialog} />
        </DialogHeader>
        <DialogBody>
          <Typography className='text-center font-bold uppercase mb-5'>
            Bạn có muốn đăng xuất?
          </Typography>
          <div className='flex justify-center gap-20'>
            <Button
              className='border-none p-5 bg-green-300 w-[150px]'
              onClick={() => logout.mutateAsync()}
            >
              Đăng xuất
            </Button>
            <Button className='p-5 w-[150px]' onClick={handleOpenDialog}>
              Hủy
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};
