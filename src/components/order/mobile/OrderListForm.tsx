import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography
} from '@material-tailwind/react';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states/order';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useOrderStore } from '@states/home';
import { OrderList, FormFooter, FileBox } from '@components/order/mobile';
import { useState } from 'react';

// Tan's second-task in here.
export function OrderListForm() {
  const [totalCost, setTotalCost] = useState<number>(0);
  const { orderPrintList, setOrderPrintList /*setTotal*/ } = useOrderPrintStore();
  const handleTotalCostChange = (newTotalCost: number) => {
    setTotalCost(newTotalCost); // Cập nhật state với giá trị từ OrderListItem
  };
  const [openDialogBackToHome, setOpenDiaLogBackToHome] = useState<boolean>(false);
  const handleOpenDialogBackToHome = () => {
    setOpenDiaLogBackToHome(!openDialogBackToHome);
  };
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const { totalSize } = useOrderStore();
  const handleBackToHome = () => {
    setOrderPrintList([]);
    setMobileOrderStep(0);
    window.location.reload();
  };
  return (
    <div>
      <div className='flex justify-between px-6 py-3 text-gray/4 shadow-md font-semibold bg-white'>
        <div className='flex items-center '>
          <ChevronLeftIcon
            width={28}
            onClick={handleOpenDialogBackToHome}
            className='cursor-pointer'
          />
          <span className='ml-4 font-bold'>Order list</span>
        </div>
        <Dialog open={openDialogBackToHome} handler={handleOpenDialogBackToHome}>
          <DialogHeader className='justify-end py-2'>
            <IconButton
              color='blue-gray'
              size='sm'
              variant='text'
              onClick={handleOpenDialogBackToHome}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </IconButton>
          </DialogHeader>
          <DialogBody>
            <Typography>Bạn có chắc muốn thoát mà không đặt hàng?</Typography>
            <div className='flex gap-5 mt-4'>
              <Button className='bg-red-400' onClick={handleBackToHome}>
                Quay về trang chủ
              </Button>
              <Button onClick={handleOpenDialogBackToHome}>Không</Button>
            </div>
          </DialogBody>
        </Dialog>
        <div className='text-xs flex flex-col'>
          <span className='font-medium'>Size limit:</span>
          <div>
            {orderPrintList.length > 0 ? `${totalSize}MB /` : `0MB`}{' '}
            <span className='text-gray/3 font-medium'>1GB</span>
          </div>
        </div>
      </div>
      {orderPrintList.length > 0 ? (
        <div className='py-6'>
          <div className='p-4 bg-white'>
            <FileBox />
          </div>
          <OrderList orders={orderPrintList} updateTotalCost={handleTotalCostChange} />
        </div>
      ) : (
        <div className='pt-12 px-4 pb-4'>
          <FileBox />
        </div>
      )}
      <FormFooter totalCost={totalCost}>
        <Button
          color={orderPrintList.length > 0 ? 'blue' : 'gray'}
          className='rounded-none w-[30%]'
          onClick={() => {
            setOrderPrintList(orderPrintList);
            setTotalCost(totalCost);
            setMobileOrderStep(3);
          }}
          disabled={orderPrintList.length === 0}
        >
          Order
        </Button>
      </FormFooter>
    </div>
  );
}
