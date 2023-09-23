import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import { AppSkeleton } from '@components/common';
import { AppLayout, AuthLayout } from '@layouts';
import { AuthPage, HomePage } from '@pages';
import { useUserStore } from '@states/common';

export default function App() {
  const navigate: NavigateFunction = useNavigate();
  const { userStatus, getUserData } = useUserStore();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (userStatus === 'SUCCESS') {
      navigate('/home');
    }
  }, [userStatus, navigate]);

  if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
    return <AppSkeleton />;
  }

  if (userStatus === 'REJECT') {
    return (
      <AuthLayout>
        <AuthPage />
      </AuthLayout>
    );
  }

  return (
    <AppLayout
      menu={[
        {
          type: 'skeleton',
          path: '/',
          element: <AppSkeleton />
        },
        {
          type: 'item',
          icon: <HomeIcon className='h-5 w-5' />,
          path: '/home',
          name: 'Trang chủ',
          element: <HomePage />
        }
        // {
        //   type: 'list',
        //   icon: <CurrencyDollarIcon className='h-5 w-5' />,
        //   name: 'Quỹ lab',
        //   routes: [
        //     {
        //       type: 'item',
        //       name: 'Thống kê',
        //       icon: <ChartBarSquareIcon strokeWidth={2} className='h-4 w-4' />,
        //       path: '/finance/statistic',
        //       element: <></>
        //     },
        //     {
        //       type: 'item',
        //       icon: <CreditCardIcon strokeWidth={2} className='h-4 w-4' />,
        //       name: 'Giao dịch',
        //       path: '/finance/transaction',
        //       element: <></>
        //     }
        //   ]
        // },
        // 'divider',
        // {
        //   type: 'item',
        //   icon: <UserCircleIcon className='h-5 w-5' />,
        //   path: '/user',
        //   name: 'Cá nhân',
        //   element: <></>
        // },
        // {
        //   type: 'logout-btn',
        //   icon: <PowerIcon className='h-5 w-5' />,
        //   name: 'Đăng xuất',
        //   //onClick: () => authService.logout().then(() => getData())
        // }
      ]}
    />
  );
}
