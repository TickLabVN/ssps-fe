import { ReactNode } from 'react';
import coin from '@assets/coin.png';
import { useUserCoinsQuery } from '@hooks';

export const FormFooter: Component<{ children: ReactNode; totalCost: number }> = ({
  children,
  totalCost
}) => {
  const { data: remainCoins } = useUserCoinsQuery();

  return (
    <div className='flex w-full h-16'>
      <div className='flex justify-between items-center text-gray/4 w-[70%] px-4 py-2 bg-white'>
        <div className='flex flex-col items-start'>
          <p className='text-base font-medium'>Balance:</p>
          <div className='grayscale flex items-center'>
            <div className='w-6 h-6'>
              <img src={coin} alt='Ballance Coin' />
            </div>
            <span>{remainCoins}</span>
          </div>
        </div>
        <div>
          <p className='text-right text-base font-medium'>Total Cost</p>
          <div className='flex items-center'>
            <div className='w-7 h-7'>
              <img src={coin} alt='Total Cost' />
            </div>
            <span className='text-2xl font-bold text-yellow/1'>{totalCost}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
