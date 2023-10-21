import { EyeIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import coin from '@assets/coin.png';
import { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Button
} from '@material-tailwind/react';

export const OrderListItem: Component<{
  id: string;
  fileName: string;
  size: number;
  coins: number;
  number: number;
  updateCurrentNumber: (newCurrentNumber: number) => void;
  handleRemove: (id: string) => void;
}> = ({ id, fileName, size, coins, number, updateCurrentNumber, handleRemove }) => {
  const [openDiaLogProduct, setOpenDiaLogProduct] = useState<boolean>(false);
  const handleOpenDiaLogProduct = () => {
    setOpenDiaLogProduct(!openDiaLogProduct);
  };
  const [currentNumber, setCurrentNumber] = useState<number>(number);
  const handleDecrease = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
      updateCurrentNumber(currentNumber - 1);
    }
  };
  const handleIncrease = () => {
    setCurrentNumber(currentNumber + 1);
    updateCurrentNumber(currentNumber + 1);
  };
  return (
    <>
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
              <span className='mx-2'>=</span>
              <img src={coin} className='w-[16px]' />
              <span className='font-bold text-yellow/1'>{currentNumber * coins}</span>
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
          <span className='text-red-500 font-bold cursor-pointer' onClick={handleOpenDiaLogProduct}>
            Remove
          </span>
        </div>
        <Dialog open={openDiaLogProduct} handler={handleOpenDiaLogProduct}>
          <DialogHeader className='justify-end'>
            <IconButton
              color='blue-gray'
              size='sm'
              variant='text'
              onClick={handleOpenDiaLogProduct}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </IconButton>
          </DialogHeader>
          <DialogBody className='pt-0 pb-6 flex flex-col items-center'>
            <Typography>Bạn có đồng ý xóa phần tử này ra khỏi danh sách?</Typography>
            <div className='mt-5 flex gap-5'>
              <Button className='bg-red-400' onClick={() => handleRemove(id)}>
                Đồng ý
              </Button>
              <Button onClick={handleOpenDiaLogProduct}>Không</Button>
            </div>
          </DialogBody>
        </Dialog>
      </div>
    </>
  );
};
