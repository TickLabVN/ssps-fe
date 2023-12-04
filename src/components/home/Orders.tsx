import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody } from '@material-tailwind/react';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import coin from '@assets/coin.png';
import { ORDER_STATUS_COLOR } from '@constants';
import { printingRequestService } from '@services';
import { retryQueryFn } from '@utils';

export function Orders() {
  const { data: orders } = useQuery({
    queryKey: ['/api/printRequest'],
    queryFn: () => printingRequestService.getPrintingRequest(),
    retry: retryQueryFn
  });
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='font-semibold text-gray/4 text-xl lg:text-4xl'>Order in progress</h3>
        <div className='flex items-center gap-1 cursor-pointer opacity-40 hover:opacity-100'>
          <span className='text-gray/4 text-sm lg:text-lg font-semibold'>See more</span>
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
        </div>
      </div>
      <div className='flex gap-2 lg:gap-6 slider-container' ref={sliderRef}>
        {orders &&
          orders.map((order, index) => (
            <Card
              key={index}
              className='grow shrink-0 flex flex-col rounded-lg shadow-md lg:min-w-[240px] sm:min-w-[184px]'
            >
              <CardBody className='p-2 lg:p-4'>
                <div className='flex flex-col items-start justify-between font-semibold text-xs lg:text-base mb-2 lg:mb-4'>
                  <span className={`capitalize text-${ORDER_STATUS_COLOR[order.status]}-500`}>
                    {order.status}
                  </span>
                  <span>{`#${order.id.slice(0, 4)}-${order.id.slice(4, 8)}`}</span>
                </div>
                <div>
                  <span className='text-blue/1 mr-1'>{order.filesName[0]}</span>
                  <span className='text-gray/4 opacity-40'>+{order.numFiles}</span>
                </div>
                <div className='flex items-center text-gray/3 mb-4'>
                  <MapPinIcon className='w-5 h-5 mr-1' />
                  <span>
                    {order.location.length > 0
                      ? order.location.length
                      : 'Tiệm in thư viện H3, tầng 1'}
                  </span>
                </div>
                <hr className='h-[1px] mb-4' />
                <div className='flex items-center justify-between text-gray/4 text-base lg:text-lg'>
                  <p>
                    <span className='font-medium'>{order.numPages} </span>
                    <span className='font-normal'>pages</span>
                  </p>
                  <div className='flex items-center text-base lg:text-lg'>
                    <img src={coin} alt='coin' width={25} />
                    <span className='text-amber-600 font-bold mr-2'>{order.coins}</span>
                    <span className='text-gray/4 opacity-40 font-normal'>({order.paid})</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        <div
          className='prevButton hidden lg:block left-[-72px] opacity-60 hover:opacity-100 bg-blue-100'
          onClick={scrollLeft}
        >
          <ChevronLeftIcon strokeWidth={3} className='w-6 h-6 text-blue/1' />
        </div>
        <div
          className='nextButton hidden lg:block right-[-72px] opacity-60 hover:opacity-100 bg-blue-100'
          onClick={scrollRight}
        >
          <ChevronRightIcon strokeWidth={3} className='w-6 h-6 text-blue/1' />
        </div>
      </div>
    </div>
  );
}
