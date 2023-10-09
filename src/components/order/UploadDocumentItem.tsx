import { EyeIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import coin from '../../assets/coin.png';
import { useState } from 'react';

export const UploadDocumentItem: Component<{
  id: string;
  fileName: string;
  size: number;
  coins: number;
  number: number;
}> = ({ id, fileName, size, coins, number }) => {
  const [currentNumber, setCurrentNumber] = useState<number>(number);
  const handleDecrease = () => {
    if (currentNumber > 1) {
      id = id;
      setCurrentNumber(currentNumber - 1);
      //   updateCurrentNumber(currentNumber - 1);
    }
  };
  const handleIncrease = () => {
    setCurrentNumber(currentNumber + 1);
    // updateCurrentNumber(currentNumber + 1);
  };
  return (
    <div className='flex gap-4 px-4 py-2 bg-white '>
      <div className="bg-[url('./src/assets/logobk.png')] bg-no-repeat bg-contain bg-center text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer">
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
              <span>{`${currentNumber}`}</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center '>
          <div className='flex  border-2 '>
            <span
              className='p-0.5 border-r-2 flex items-center cursor-pointer'
              onClick={handleDecrease}
            >
              <MinusIcon width={20} />
            </span>
            {currentNumber > 0 && <span className='py-0.5 px-6'>{currentNumber}</span>}
            <span
              className='p-0.5 border-l-2 flex items-center cursor-pointer'
              onClick={handleIncrease}
            >
              <PlusIcon width={20} />
            </span>
          </div>
          <div className='flex gap-1'>
            <img src={coin} className='w-[16px]' />
            <span className='font-bold text-yellow/1'>{currentNumber * coins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
