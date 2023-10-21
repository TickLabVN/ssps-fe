import { useEffect } from 'react';
import { ArrowRightIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { Orders, Slides, useChooseFileBox } from '@components/home';
import { useOrderStore, useSlideStore, useUserInfoStore } from '@states/home';
import { useOrderExtraStore, useOrderPrintStore, useOrderWorkflowStore } from '@states/order';

export function HomePage() {
  const { orderData, getOrderData } = useOrderStore();
  const { slideData, getSlideData } = useSlideStore();
  const { setOrderPrintList } = useOrderPrintStore();
  const { getUserInfoData } = useUserInfoStore();
  const { getOrderExtraData } = useOrderExtraStore();

  const { openChooseFileBox, ChooseFileBox } = useChooseFileBox();
  const { desktopOrderStep } = useOrderWorkflowStore();

  useEffect(() => {
    getOrderData();
    getSlideData();
    getUserInfoData();
    getOrderExtraData();
  }, [getOrderData, getSlideData, getUserInfoData, getOrderExtraData]);

  useEffect(() => {
    setOrderPrintList(orderData);
  }, [orderData, setOrderPrintList]);

  if (desktopOrderStep === 0) {
    return (
      <>
        <div className='p-6 lg:py-5 lg:px-56'>
          <div className='mb-4 lg:mb-6'>
            <h4 className='font-normal text-blue/1 text-base lg:text-2xl'>
              Student Smart Printing Service (SSPS)
            </h4>
            <h3 className='font-bold text-blue/2 text-xl lg:text-4xl'>Welcome Username!</h3>
          </div>
          <div className='mb-4 lg:mb-12'>
            <Slides slides={slideData} />
          </div>
          <div
            className='flex items-center justify-between bg-blue/1 rounded-lg p-4 mb-16 lg:mb-24 lg:h-[120px] lg:px-6 cursor-pointer'
            onClick={openChooseFileBox}
          >
            <div className='flex items-center gap-4'>
              <PrinterIcon
                strokeWidth={2}
                className='bg-white text-blue-500 rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 lg:p-3'
              />
              <span className='text-white font-bold lg:text-2xl'>Order printing</span>
            </div>
            <ArrowRightIcon strokeWidth={3} className='text-white w-4 h-4 lg:w-6 lg:h-6' />
          </div>
          <Orders orders={orderData} />
        </div>

        {<ChooseFileBox />}
      </>
    );
  }
}
