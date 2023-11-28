import { FileBox } from '@components/order/common';
import previewImage from '@assets/preview.png';
import CoinIcon from '@assets/coin.png';
import { useState } from 'react';
import { TrashIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Button } from '@material-tailwind/react';

export function OrderListForm() {
  const serviceFee = 0;
  const [orders, setOrders] = useState([
    {
      preview: { previewImage },
      name: 'filename.csv',
      size: '20 MB',
      amount: 2,
      fileCost: 200
    },
    {
      preview: { previewImage },
      name: 'filename.csv',
      size: '20 MB',
      amount: 2,
      fileCost: 200
    },
    {
      preview: { previewImage },
      name: 'filename.csv',
      size: '20 MB',
      amount: 2,
      fileCost: 200
    },
    {
      preview: { previewImage },
      name: 'filename.csv',
      size: '20 MB',
      amount: 2,
      fileCost: 200
    }
  ]);
  const updateOrderAmount = (index: number, newAmount: number) => {
    const updatedOrders = [...orders];
    updatedOrders[index]!.amount = newAmount;
    setOrders(updatedOrders);
  };
  const removeFile = (index: number) => {
    const updateOrders = [...orders];
    updateOrders.splice(index, 1);
    setOrders(updateOrders);
  };
  const sumFee = orders.reduce((total, order) => total + order.fileCost * order.amount, 0);
  return (
    <div className='flex py-9 px-32 gap-6'>
      <div className='w-[70%]'>
        <div className='p-4 bg-white mb-6 rounded-lg'>
          <FileBox />
        </div>
        <div className='grid grid-rows-[auto, 1fr]'>
          <div className='grid grid-cols-7 px-6  text-blue/1 bg-gray/2 text-base font-semibold text-gray/4 text-center rounded-t-lg'>
            <div className='col-span-4 border-r border-gray-400'>TÀI LIỆU ĐẶT IN</div>
            <div className='col-span-1 border-r border-gray-400'>SỐ LƯỢNG</div>
            <div className='col-span-1 border-r border-gray-400'>THÀNH TIỀN</div>
            <div></div>
          </div>
          {orders.map((order, index) => (
            <div className='grid grid-cols-7 px-6 py-6 border-b border-gray/2 bg-white'>
              <div className='col-span-4 flex ml-0'>
                <img src={order.preview.previewImage} alt='Preview' className='mr-6' />
                <div className='flex flex-col'>
                  <div className=''>
                    <span className='text-2xl font-medium text-blue/1 mr-1'>{order.name}</span>
                    <span className='text-2xl font-medium text-gray/3'>({order.size})</span>
                  </div>
                  <div className='flex items-center'>
                    <img
                      src={CoinIcon}
                      alt='Coin Icon'
                      className='w-6 h-6 mr-1 opacity-50 mix-blend-luminosity'
                    />
                    <span className='text-2xl font-normal text-gray/'>{order.fileCost}</span>
                  </div>
                </div>
              </div>
              <div className='col-span-1 px-6 flex items-center justify-center'>
                <MinusIcon
                  width={24}
                  className='cursor-pointer'
                  onClick={() => {
                    if (order.amount > 0) {
                      updateOrderAmount(index, order.amount - 1);
                    }
                  }}
                />
                <span className='px-2 text-[24px]'>{order.amount}</span>
                <PlusIcon
                  width={24}
                  className='cursor-pointer'
                  onClick={() => updateOrderAmount(index, order.amount + 1)}
                />
              </div>
              <div className='col-span-1 px-6 flex items-center justify-center '>
                <div className='flex'>
                  <img src={CoinIcon} alt='Coin Icon' className='w-6 h-6 mr-1' />
                  <span className='text-2xl font-bold text-[#D97706]'>
                    {order.fileCost * order.amount}
                  </span>
                </div>
              </div>
              <div className='col-span-1 flex items-center justify-center cursor-pointer'>
                <TrashIcon width={28} onClick={() => removeFile(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-[30%]'>
        <div className='px-5 py-3 bg-white rounded-t-lg'>
          <div className='flex gap-4 mb-6'>
            <ClipboardDocumentListIcon width={28} color='blue' />
            <span>Charge Details</span>
          </div>
          <div className='flex justify-between'>
            <span>Print fee</span>
            <div className='flex'>
              <img
                src={CoinIcon}
                alt='Coin Icon'
                className='w-6 h-6 mr-1 opacity-50 mix-blend-luminosity'
              />
              {sumFee}
            </div>
          </div>
          <div className='flex justify-between mb-3'>
            <span>Service fee</span>
            {serviceFee === 0 ? (
              <span className='opacity-40'>Not yet estimated</span>
            ) : (
              <div className='flex gap-2'>
                <img
                  src={CoinIcon}
                  alt='Coin Icon'
                  className='w-6 h-6 mr-1 opacity-50 mix-blend-luminosity'
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <span>Total Cost</span>
            <div className='flex'>
              <img src={CoinIcon} alt='Coin Icon' className='w-6 h-6 mr-1' />
              {sumFee + serviceFee}
            </div>
          </div>
        </div>
        <Button className='uppercase font-bold text-white text-[32px] bg-blue/1 w-full rounded-t-none'>
          order
        </Button>
      </div>
    </div>
  );
}
