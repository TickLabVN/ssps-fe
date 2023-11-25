import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';
import { AppSkeleton } from '@components/common';
import { MAIN_MENU, SUB_MENU } from '@constants';
import { useUserQuery } from '@hooks';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, HomePage } from '@pages';
import { ConfirmOrder } from './pages/ConfirmOrder';

export default function App() {
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
            path: '/confirmOrder',
            name: SUB_MENU.confirmOrder,
            element: <ConfirmOrder />
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
            onClick() {}
            //onClick: () => authService.logout().then(() => getData())
          }
        ]}
      />
    );
  }
}
