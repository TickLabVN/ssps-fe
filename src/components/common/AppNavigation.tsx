import { useMemo } from 'react';
import { ChevronLeftIcon, PowerIcon } from '@heroicons/react/24/solid';
import coin from '@assets/coin.png';
import { AppDrawer, DesktopNavbar, ToggleSidebarBtn, useSidebarMenu } from '@components/common';
import { useCloseForm } from '@components/order/common';
import { ScreenSize } from '@constants';
import { useScreenSize, useUserQuery, usePrintingRequestQuery, emitEvent } from '@hooks';
import { useMenuBarStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';
import { useAuthMutation } from '@hooks';

export const AppNavigation: Component<{ mainMenu: RouteMenu; subMenu: RouteMenu }> = ({
  mainMenu,
  subMenu
}) => {
  const { screenSize } = useScreenSize();
  const { openSidebar, handleOpenSidebar, SidebarMenu } = useSidebarMenu();
  const { selectedMenu } = useMenuBarStore();
  const { desktopOrderStep } = useOrderWorkflowStore();
  const { logout } = useAuthMutation();

  const { openCloseForm, CloseForm } = useCloseForm();

  const {
    remainCoins: { data }
  } = useUserQuery();
  const {
    listFiles: { data: listFiles }
  } = usePrintingRequestQuery();

  const totalSize = useMemo(
    () => listFiles?.reduce((totalSize, file) => totalSize + file.fileSize, 0),
    [listFiles]
  );
  return (
    <div className='w-full max-h-[768px] py-3 shadow-md lg:sticky my-3 lg:my-0'>
      <div className='flex items-center justify-between px-6 lg:px-9'>
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
          {data && (
            <div className='flex items-center w-18.25 lg:w-26 h-6 lg:h-9 bg-[#FEECDC] pl-4 pr-6 lg:pl-6 lg:pr-9 rounded-lg -mr-5 font-bold text-[#9F580A] lg:font-semibold lg:text-2xl select-none text-base'>
              {data}
            </div>
          )}
          <img className='w-7 h-7 lg:w-10 lg:h-10' src={coin} alt='coin'></img>
          <PowerIcon
            onClick={() => {
              logout.mutateAsync();
            }}
            className='w-10 h-10 hidden lg:block lg:opacity-40 lg:ml-6 lg:cursor-pointer'
          />
        </div>
      </div>
      {screenSize >= ScreenSize.MD && desktopOrderStep > 0 && (
        <>
          <hr className='my-1' />
          {desktopOrderStep === 1 && (
            <>
              <div className='flex items-center justify-between px-6'>
                <div className='flex items-center gap-2'>
                  <ChevronLeftIcon
                    className='w-5 h-5 hover:bg-gray-100 cursor-pointer p-2 rounded-full'
                    onClick={openCloseForm}
                  />
                  <p className='text-gray/4 font-semibold text-xl'>Order list</p>
                </div>
                <div className='text-right text-sm'>
                  <p className='font-medium text-gray/4'>Size limit:</p>
                  <p>
                    <span className='font-semibold'>{`${
                      totalSize && formatFileSize(totalSize)
                    } / `}</span>
                    <span className='text-gray/3 font-medium'>1GB</span>
                  </p>
                </div>
              </div>
              <CloseForm
                handleSave={() => {
                  emitEvent('appNavigation:save');
                }}
                handleExist={() => {
                  emitEvent('appNavigation:exist');
                }}
                listFilesLength={listFiles?.length}
              />
            </>
          )}
          {desktopOrderStep === 2 && (
            <div className='flex items-center gap-2 px-9'>
              <ChevronLeftIcon className='w-5 h-5' />
              <p className='text-gray/4 font-semibold text-lg'>Confirm order</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
