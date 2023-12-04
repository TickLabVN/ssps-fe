import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';
import { AppSkeleton } from '@components/common';
import { MAIN_MENU, SUB_MENU } from '@constants';
import { emitEvent, useUserQuery, useAuthMutation } from '@hooks';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, HomePage } from '@pages';
import { Dialog, DialogBody, DialogHeader, Typography, Button } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function App() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  const { logout } = useAuthMutation();
  const navigate: NavigateFunction = useNavigate();
  const {
    info: { isFetching, isError, isSuccess, refetch }
  } = useUserQuery();
  const { pathname } = useLocation();

  useEffect(() => {
    refetch({ throwOnError: true }).catch((err) => {
      if (err.statusCode !== 401) toast.error(err.message);
    });
  }, [refetch]);

  useEffect(() => {
    if (pathname === '/' && isSuccess) {
      navigate('/home');
    }
  }, [pathname, isSuccess, navigate]);

  if (isFetching) return <AppSkeleton />;

  if (isError)
    return (
      <AuthLayout>
        <AuthPage />
      </AuthLayout>
    );

  if (isSuccess) {
    return (
      <>
        <AppLayout
          menu={[
            {
              type: 'skeleton',
              path: '/',
              name: 'Skeleton',
              element: <AppSkeleton />
            },
            {
              type: 'main-item',
              path: '/home',
              name: MAIN_MENU.home,
              element: <HomePage />
            },
            {
              type: 'main-item',
              path: '/order',
              name: MAIN_MENU.order,
              element: <></>
            },
            {
              type: 'main-item',
              path: '/payment',
              name: MAIN_MENU.payment,
              element: <></>
            },
            {
              type: 'main-item',
              path: '/location',
              name: MAIN_MENU.location,
              element: <></>
            },
            {
              type: 'sub-item',
              path: '/help',
              name: SUB_MENU.help,
              element: <></>
            },
            {
              type: 'sub-item',
              path: '/settings',
              name: SUB_MENU.settings,
              element: <></>
            },
            {
              type: 'logout-btn',
              name: SUB_MENU.logout,
              onClick: () => emitEvent('logout')
            }
          ]}
        />
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
      </>
    );
  }
}
