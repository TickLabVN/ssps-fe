import CoinIcon from '@assets/coin.png';
import {
  ClipboardDocumentListIcon,
  MapPinIcon,
  PrinterIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import {
  ChevronRightIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/solid';
import { Button } from '@material-tailwind/react';
import previewImage from '@assets/preview.png';
export function ConfirmOrder() {
  const PICK_UP_LOCATION = 'Tiệm in thư viện H3, tầng 1';
  const User_Balance = 200;
  const Orders = [
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
  ];
  const PRINT_FEE = Orders.reduce((total, order) => total + order.fileCost * order.amount, 0);
  const FEE = [
    { name: 'Print fee', price: PRINT_FEE },
    { name: 'Service fee', price: 2 }
  ];
  const BUTTON_CLASSNAME =
    'h-[64px] px-8 py-2 text-xl font-bold text-white rounded-none hover:shadow-none shadow-none rounded-b-lg';
  return (
    <div className='pt-[36px] px-[128px] flex'>
      <div className='bg-white shrink grow mr-12 rounded-t-lg'>
        <div className='px-6 py-4 flex text-blue/1'>
          <PrinterIcon className='w-6 h-6' />
          <span className='ml-2 text-base font-medium text-gray/4'>Document</span>
        </div>
        <div className='grid grid-rows-[auto, 1fr]'>
          <div className='grid grid-cols-6 px-6 py-3 text-blue/1 bg-gray/2 text-base font-semibold text-gray/4 text-center'>
            <div className='col-span-4 border-r border-gray-400'>TÀI LIỆU ĐẶT IN</div>
            <div className='col-span-1 border-r border-gray-400'>SỐ LƯỢNG</div>
            <div className='col-span-1'>THÀNH TIỀN</div>
          </div>
          {Orders.map((order) => (
            <div className='grid grid-cols-6 px-6 py-6 border-b border-gray/2 '>
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
              <div className='col-span-1 px-6 flex items-center justify-center '>
                <span className='text-2xl font-medium text-gray/4 items-center'>
                  x{order.amount}
                </span>
              </div>
              <div className='col-span-1 px-6 flex items-center justify-center '>
                <div className='flex'>
                  <img src={CoinIcon} alt='Coin Icon' className='w-6 h-6 mr-1' />
                  <span className='text-2xl font-bold text-[#D97706]'>
                    {order.fileCost * order.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex-none w-[360px] h-[612px] '>
        <div className='flex flex-col gap-y-6'>
          <div className='flex flex-col bg-white'>
            <div className='flex px-6 py-4'>
              <MapPinIcon className='w-6 h-6 text-blue/1' />
              <span className='ml-2 text-base font-medium text-gray/4'>Pick-up location</span>
            </div>
            <div className='px-6 pb-4 flex justify-between'>
              <span className='text-base font-normal text-gray/4'>{PICK_UP_LOCATION}</span>
              <QuestionMarkCircleIcon className='w-7 h-7 opacity-40 cursor-pointer focus:opacity-100 active:opacity-100' />
            </div>
          </div>
          <div className='flex flex-col bg-white'>
            <div className='flex px-6 py-4'>
              <WalletIcon className='w-6 h-6 text-blue/1' />
              <span className='ml-2 text-base font-medium text-gray/4'>Payment method</span>
            </div>
            <div className='px-6 pb-4'>
              <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                  <span className='text-base font-medium text-gray/4'>Print wallet</span>
                  <ChevronRightIcon className='w-7 h-7 opacity-40 focus:opacity-100 active:opacity-100 cursor-pointer' />
                </div>
                <div className='flex'>
                  <span className='text-base font-medium text-gray/4'>Current balance:</span>
                  <img src={CoinIcon} alt='Coin Icon' className='w-6 h-6 mr-1' />
                  <span className='text-base font-bold text-[#D97706]'>{User_Balance}</span>
                </div>
                <div
                  className={
                    User_Balance >= FEE.reduce((total, item) => total + item.price, 0)
                      ? 'hidden'
                      : 'flex flex-col mt-3 bg-red-100 rounded-sm p-3'
                  }
                >
                  <div className='flex'>
                    <ExclamationCircleIcon className='w-6 h-6 text-red-600 mr-3' />
                    <span className='text-base font-bold text-red-600'>Amount exceed balance!</span>
                  </div>
                  <div className='text-base font-normal text-red-600'>
                    Top up your account to proceed.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-white rounded-b-lg'>
            <div className='flex px-6 py-4'>
              <ClipboardDocumentListIcon className='w-6 h-6 text-blue/1 mr-3' />
              <span className='text-base font-medium text-gray/4'>Charge Details</span>
            </div>
            <div className='px-6 pb-6'>
              {FEE.map((item) => (
                <div className='flex justify-between'>
                  <span className='text-base font-normal text-gray/4'>{item.name}</span>
                  <div className='flex'>
                    <img
                      src={CoinIcon}
                      alt='Coin Icon'
                      className='w-6 h-6 mr-1 mix-blend-luminosity opacity-50;'
                    />
                    <span className='text-base font-normal text-gray/4'>{item.price}</span>
                  </div>
                </div>
              ))}
              <div className='flex justify-between mt-3'>
                <span className='text-base font-medium text-gray/4'>Total cost</span>
                <div className='flex'>
                  <img src={CoinIcon} alt='Coin Icon' className='w-6 h-6 mr-1' />
                  <span className='text-base font-bold text-[#D97706]'>
                    {FEE.reduce((total, item) => total + item.price, 0)}
                  </span>
                </div>
              </div>
            </div>
            <Button
              fullWidth
              className={
                User_Balance >= FEE.reduce((total, item) => total + item.price, 0)
                  ? BUTTON_CLASSNAME + ' bg-blue/1'
                  : BUTTON_CLASSNAME + ' bg-gray/2 pointer-events-none'
              }
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
