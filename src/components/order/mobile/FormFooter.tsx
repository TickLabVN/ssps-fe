import coin from '@assets/coin.png';
// import { ILayout } from '@interfaces';
import { useUserInfoStore } from '@states/home';
import { ReactNode } from 'react';
export const FormFooter: Component<{ children: ReactNode; totalCost: number }> = ({
  children,
  totalCost
}) => {
  const { userInfoData } = useUserInfoStore();
  return (
    <div className='flex w-full'>
      <div className='flex justify-between text-gray/4 text-xs w-[70%] px-4 py-2 bg-white'>
        <div>
          <div>Balance:</div>
          <div className='grayscale flex'>
            <img src={coin} width={16} />
            <span>{userInfoData.coins}</span>
          </div>
        </div>
        <div>
          <div className='text-right'>Total Cost</div>
          <div className='flex'>
            <img src={coin} width={24} />
            <span className='text-2xl font-bold text-yellow/1'>{totalCost}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
