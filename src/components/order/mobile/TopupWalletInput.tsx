import coin from '@assets/coin.png';
import { SUGGEST_AMOUNT } from '@constants';
import { BanknotesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import { useRef, useState } from 'react';

export function TopupWalletInput() {
  const [showInfo, setShowInfo] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className='rounded-none shadow-sm my-4'>
      <CardBody className='px-6 py-4 flex items-center'>
        <BanknotesIcon className='w-5 h-5 text-blue/1 mr-2' />
        <Typography className='text-gray/4 text-base font-medium '>Top up wallet</Typography>
      </CardBody>
      <CardBody className='px-6 pt-0 pb-6'>
        <div className='flex items-center'>
          <Typography className='text-gray/4 text-xs font-medium'>Current Balance:</Typography>
          <img className='w-4 h-4 mix-blend-luminosity ml-1' src={coin}></img>
          <Typography className='text-gray/4 text-xs font-medium'>{100}</Typography>
        </div>
        <div className='relative'>
          <Input
            color='blue'
            label='Top up Amount'
            value={inputValue}
            size='lg'
            className='px-4 pb-11 text-gray/4 !text-2xl !font-bold border rounded-lg '
            labelProps={{
              className:
                'text-gray/4 text-xs font-normal peer-placeholder-shown:text-base peer-placeholder-shown:text-[#9CA3AF] peer-disabled:peer-placeholder-shown::text-xs '
            }}
            containerProps={{
              className: 'min-h-[88px] mt-2 '
            }}
            crossOrigin={undefined}
            inputRef={inputRef}
            onBlur={() => !inputRef.current?.value && setShowInfo(false)}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowInfo(true);
            }}
            maxLength={10}
          />
          <div className={showInfo ? '' : 'hidden'}>
            <XMarkIcon
              className='w-7 h-7 text-gray/4 absolute right-4 top-4 cursor-pointer'
              onClick={() => {
                setInputValue('');
                setShowInfo(false);
              }}
            />
            <div className='px-4 absolute flex justify-between w-full left-0 bottom-3'>
              <div className='flex items-center flex-wrap'>
                <Typography className='text-gray/4 text-xs'>Exchange to:</Typography>
                <img className='w-4 h-4 ml-1' src={coin}></img>
                <Typography className='text-[#D97706] text-xs font-bold'>{100}</Typography>
              </div>
              <div className='flex items-center flex-wrap'>
                <Typography className='text-gray/4 text-xs'>(Bonus:</Typography>
                <img className='w-4 h-4 mix-blend-luminosity' src={coin}></img>
                <Typography className='text-gray/4 text-xs'>{100})</Typography>
              </div>
            </div>
            {Number(inputValue.replace(/[^0-9]/g, '')) < 10000 && (
              <div className='flex absolute left-2 bottom-[-24px]'>
                <ExclamationTriangleIcon className='w-5 h-5 text-[#F42500] mr-2 ' />
                <Typography className='text-gray/4 text-xs'>
                  Minimum amount is {SUGGEST_AMOUNT[0]}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div
          className={
            showInfo && Number(inputValue.replace(/[^0-9]/g, '')) < 10000
              ? 'mt-6 mb-4 flex items-start content-start flex-wrap gap-2'
              : 'my-4 flex items-start content-start flex-wrap gap-2'
          }
        >
          {SUGGEST_AMOUNT.map((item: string, index: number) => (
            <Button
              key={index}
              className='p-2 rounded-lg bg-[#DBEAFE] text-base font-semibold text-blue/1 shadow-none normal-case'
              onClick={() => {
                setInputValue(item);
                setShowInfo(true);
              }}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className='flex'>
          <Typography className='text-gray/4 text-xs font-medium flex'>Bonus:</Typography>
          <img className='w-4 h-4' src={coin}></img>
          <Typography className='text-[#D97706] text-xs font-bold'>{100}</Typography>
          <Typography className='text-gray/3 text-xs font-normal ml-1'>(for every 100)</Typography>
        </div>
      </CardBody>
    </Card>
  );
}
