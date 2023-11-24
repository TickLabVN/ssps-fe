import { EyeIcon } from '@heroicons/react/24/solid';
import coin from '@assets/coin.png';
import { Typography } from '@material-tailwind/react';
export const ConfirmOrderItem: Component<{
  fileName: string;
  coins: number;
  size: number;
  number: number;
}> = ({ fileName, coins, size, number }) => {
  return (
    <div className='flex gap-4 p-4 bg-white '>
      <div className="bg-[url('./src/assets/logobk.png')] w-16 bg-no-repeat bg-contain bg-center text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer">
        <EyeIcon width={12} />
        <div className='text-xs'>Preview</div>
      </div>
      <div className='w-full'>
        <div className='flex flex-col text-gray/4'>
          <div>
            <span className='text-gray/4'>{fileName}</span>
            <span className='text-gray/3'>{` (${size} MB)`}</span>
          </div>
          <div className='text-xs mb-5'>
            <div className='flex'>
              <img src={coin} className='grayscale w-[16px]' />
              <span>{coins}</span>
              <span className='mx-2'>x</span>
              <span>{`${number}`}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end gap-1'>
          <Typography>Charge price</Typography>
          <div className='flex gap-1'>
            <img src={coin} className='w-[16px]' />
            <span className='font-bold text-yellow/1'>{number * coins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
