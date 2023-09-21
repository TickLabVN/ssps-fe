import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import location from '../assets/location-marker.jpg';
import coin from '../assets/coin.png';
import { FC } from 'react';
interface Order {
  id: string;
  status: string;
  location: string;
  number: number;
  fileName: string;
  pageNumber: number;
  coins: number;
  paid: string;
}

interface OrdersProps {
  orders: Order[];
}
const Orders: FC<OrdersProps> = ({ orders }) => {
  const sliderRef = useRef(document.createElement('div'));

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= 400;
  };
  const scrollRight = () => {
    sliderRef.current.scrollLeft += 400;
  };
  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-[#495057] text-xl lg:text-4xl'>Order in progress</h3>
        <div className='flex cursor-pointer opacity-40'>
          <span className='text-[#495057] text-sm lg:text-lg mr-[5px] font-semibold opacity-40 hover:opacity-100'>
            See more
          </span>
          <ArrowRightIcon className='w-3' />
        </div>
      </div>
      <div className='flex gap-[8px] lg:gap-[24px] slider-container' ref={sliderRef}>
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className='p-2 lg:p-4 bg-white grow shrink-0 flex flex-col rounded-lg border-[1px] shadow-[rgba(0, 0, 0, 0.05)] shadow-md'
            >
              <div className='text-xs flex justify-between mb-2 lg:mb-4'>
                <span className='font-semibold leading-[18px]'>{order.id}</span>
                <span
                  className={
                    order.status === 'Progressing'
                      ? 'text-[#C27803]'
                      : order.status === 'Ready'
                      ? 'text-[#0E9F6E]'
                      : order.status === 'Done'
                      ? 'text-[#6875F5]'
                      : 'text-[#F05252]'
                  }
                >
                  {order.status}
                </span>
              </div>
              <div className=''>
                <span className='text-[#1488D8] mr-1'>{order.fileName}</span>
                <span className='text-[#495057] opacity-40'>+{order.number}</span>
              </div>
              <div className='flex items-center mb-4'>
                <img src={location} width={20} height={20} className='mr-2' />
                <span className='text-[#ACB5BD]'>{order.location}</span>
              </div>
              <hr className='h-[1px] mb-4' />
              <div className='flex items-center justify-between'>
                <span className='text-[#495057] font-medium'>{order.pageNumber} pages</span>
                <div className='flex'>
                  <img src={coin} width={20} />
                  <span className='mr-2'>{order.coins}</span>
                  <span className='text-[#495057] opacity-40'>({order.paid})</span>
                </div>
              </div>
            </div>
          );
        })}
        <div className='prevButton hidden lg:block left-[-72px] opacity-60 hover:opacity-100 bg-white '>
          <ArrowLeftIcon className='w-4 text-[#1488D8]' onClick={scrollLeft} />
        </div>
        <div className='nextButton hidden lg:block right-[-72px] opacity-60 hover:opacity-100 bg-white'>
          <ArrowRightIcon className='w-4 text-[#1488D8]' onClick={scrollRight} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
