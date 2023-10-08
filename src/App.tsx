import { useEffect } from 'react';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';
import { AppSkeleton } from '@components/common';
import { MAIN_MENU, SUB_MENU } from '@constants';
import { AppLayout } from '@layouts';
import { HomePage, TestPreviewPage } from '@pages';
import { useUserStore } from '@states/common';

export default function App() {
  const navigate: NavigateFunction = useNavigate();
  const { userStatus, getUserData } = useUserStore();

  const { pathname } = useLocation();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (pathname === '/' && userStatus === 'SUCCESS') {
      navigate('/home');
    }
  }, [pathname, userStatus, navigate]);

  if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
    return <AppSkeleton />;
  }

  // if (userStatus === 'REJECT') {
  //   return (
  //     <AuthLayout>
  //       <AuthPage />
  //     </AuthLayout>
  //   );
  // }

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
        },
        {
          type: 'sub-item',
          path: '/test-preview',
          name: 'Test Document Preview',
          element: <TestPreviewPage />
        }
      ]}
    />
  );
}
