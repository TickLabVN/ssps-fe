import { InformationCircleIcon, BanknotesIcon, WalletIcon } from '@heroicons/react/24/outline';
import { Button, Radio } from '@material-tailwind/react';
import coinImage from '@assets/coin.png';

export const TopUpWalletDestop = () => {
  const currentBalance = 202;
  const amountList = [10000, 20000, 50000, 100000, 200000, 500000];
  const bonus = 20;
  const amountLevel = 100000;
  const methodList = [
    {
      image: coinImage,
      method: 'Momo'
    },
    {
      image: coinImage,
      method: 'Zalo'
    },
    {
      image: coinImage,
      method: 'VNPay'
    }
  ];
  return (
    <div className='px-60 py-9 flex flex-col gap-6'>
      <div className='flex gap-3 bg-white px-6 py-4'>
        <InformationCircleIcon width={24} className='text-blue/1' />
        <span>Exchange rate</span>
      </div>
      <div className='bg-white px-6 py-4'>
        <div className='flex gap-3 mb-4'>
          <BanknotesIcon width={24} className='text-blue/1' />
          <span>Top up wallet</span>
        </div>
        <div className='flex gap-2'>
          <span>Current balance:</span>
          <div className='flex'>
            <img src={coinImage} className='w-6 h-6 mr-1 opacity-50 mix-blend-luminosity' />
            <span>{currentBalance}</span>
          </div>
        </div>
        <input
          type='text'
          className='px-4 w-full h-[120px] border-2 border-slate-400 mt-2 rounded-lg mb-4'
          placeholder='Top up amount'
        />
        <div className='flex gap-2 mb-4'>
          {amountList.map((amount) => (
            <Button className='px-6 py-4 bg bg-blue-300'>{`${amount} đ`}</Button>
          ))}
        </div>
        <div className='flex gap-3'>
          <span>Bonus:</span>
          <div className='flex gap-1'>
            <img src={coinImage} className='w-6 h-6 opacity-50' />
            <span>{bonus}</span>
            <span className='opacity-40'>{`(for every ${amountLevel} đ)`}</span>
          </div>
        </div>
      </div>
      <div className='bg-white px-6 py-4'>
        <div className='flex gap-3 mb-4'>
          <WalletIcon width={24} className='text-blue/1' />
          <span>Payment method</span>
        </div>
        <div className='flex flex-col gap-3'>
          {methodList.map((method) => (
            <Radio
              name='method'
              label={
                <div className='flex gap-2'>
                  <img src={method.image} />
                  <div>
                    <h3 className='font-bold'>{`Pay with ${method.method} wallet`}</h3>
                    <h4 className='opacity-40'>{`Redirect to ${method.method}`}</h4>
                  </div>
                </div>
              }
              crossOrigin=''
            />
          ))}
        </div>
      </div>
      <Button className='w-full bg-blue/1'>Confirm</Button>
    </div>
  );
};
