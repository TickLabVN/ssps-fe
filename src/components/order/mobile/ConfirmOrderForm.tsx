import { useOrderWorkflowStore, useOrderExtraStore, useOrderPrintStore } from '@states';
import {
  PrinterIcon,
  ChevronLeftIcon,
  XMarkIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  WalletIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/solid';
import { Typography, Select, Option, Alert, Button } from '@material-tailwind/react';
import { useHomeStore } from '@states';
import { FormFooter } from '@components/order/common';
import { ConfirmOrderItem } from '@components/order/mobile';
import coin from '@assets/coin.png';

// Tan's third-task in here.
export function ConfirmOrderForm() {
  const { totalCost, orderPrintList } = useOrderPrintStore();
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const { userRemainCoins } = useHomeStore();
  const { extraFeeData } = useOrderExtraStore();
  function IconSolid() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='h-4 w-4 text-red-600'
      >
        <path
          fillRule='evenodd'
          d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
          clipRule='evenodd'
        />
      </svg>
    );
  }
  return (
    <div className='text-gray-4'>
      <div className='flex justify-between px-6 py-3  shadow-md font-semibold bg-white mb-6'>
        <div className='flex items-center'>
          <ChevronLeftIcon
            width={28}
            onClick={() => setMobileOrderStep(2)}
            className='cursor-pointer'
          />
          <Typography className='ml-4 font-bold text-gray/4'>Confirm order</Typography>
        </div>
        <XMarkIcon width={28} className='cursor-pointer' />
      </div>
      <div>
        <div className='flex px-6 py-4 items-center bg-white'>
          <PrinterIcon width={24} className='mr-2 text-blue-500' />
          <Typography>Document</Typography>
        </div>
        <div className='mb-4'>
          {orderPrintList.map((orderItem, index) => (
            <ConfirmOrderItem
              key={index}
              fileName={orderItem.filesName[0]}
              coins={orderItem.coins}
              size={orderItem.size}
              number={orderItem.number}
            />
          ))}
        </div>
        <div className='bg-white mb-4 px-6 py-4'>
          <div className='flex mb-4'>
            <MapPinIcon width={24} className='mr-2 text-blue-500' />
            <Typography>Pick-up location</Typography>
          </div>
          <div className='flex gap-4'>
            <Select label='Chọn địa điểm'>
              <Option>Tiệm in thư viện H3, tầng 1</Option>
              <Option>Phương án khác</Option>
            </Select>
            <QuestionMarkCircleIcon width={24} className='cursor-pointer' />
          </div>
        </div>
        <div className='px-6 py-4 bg-white mb-4'>
          <div className='flex mb-4'>
            <WalletIcon width={24} className='mr-2 text-blue-500' />
            <Typography>Payment method</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography className='font-medium'>Print wallet</Typography>
            <ChevronRightIcon width={20} />
          </div>
          <div className='flex items-center mb-4'>
            <Typography className='mr-2 text-xs'>Current balance:</Typography>
            <div className='flex items-center'>
              <Typography className='text-xs'>{userRemainCoins}</Typography>
              <img src={coin} width={16} />
            </div>
          </div>
          {userRemainCoins < totalCost && (
            <Alert className='bg-red-50 text-red-600 mb-4' icon={<IconSolid />}>
              <Typography className='text-xs font-bold'>Amout exceed balance</Typography>
              <Typography className='-ml-7 text-xs'>Top up your account to proceed</Typography>
            </Alert>
          )}
        </div>
        <div className='px-6 py-4 bg-white mb-4'>
          <div className='flex mb-4'>
            <ClipboardDocumentListIcon width={24} className='mr-2 text-blue-500' />
            <Typography>Charge Details</Typography>
          </div>
          <ul>
            <li className='flex justify-between text-xs mb-1'>
              <span>Print fee</span>
              <div className='flex'>
                <img className='grayscale' src={coin} width={16} />
                <span>{totalCost}</span>
              </div>
            </li>
            <li className='flex justify-between text-xs mb-1'>
              <span>Service fee</span>
              <div className='flex'>
                <img className='grayscale' src={coin} width={16} />
                <span>{extraFeeData.extraFee}</span>
              </div>
            </li>
            <li className='flex justify-between'>
              <span>Total Cost</span>
              <div className='flex'>
                <img src={coin} width={20} />
                <span>{totalCost + extraFeeData.extraFee}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <FormFooter totalCost={totalCost + extraFeeData.extraFee}>
        <Button
          color={orderPrintList.length > 0 ? 'blue' : 'gray'}
          className='rounded-none w-[30%]'
          onClick={() => setMobileOrderStep(4)}
          disabled={orderPrintList.length === 0}
        >
          Confirm
        </Button>
      </FormFooter>
    </div>
  );
}
