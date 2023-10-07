import coin from '@assets/coin.png';
import { SUGGEST_AMOUNT } from '@constants/suggestAmount';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import { useUserInfoStore } from '@states/home';
import { useBonusStore, useCoinExchangeStore } from '@states/order';
import { useEffect, useRef, useState } from 'react';
// Tue's first-task in here.
export function TopupWalletInput() {
  const { userInfoData } = useUserInfoStore();
  const { bonusData } = useBonusStore();
  const { coinExchangeData } = useCoinExchangeStore();
  const [showInfo, setShowInfo] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [coinExchange, setCoinExchange] = useState(0);
  const [bonus, setBonus] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const calculateCoinExchange = () => {
      if (inputValue) {
        const value = Number(inputValue.replace(/[^0-9]/g, ''));
        const amounts = Number(coinExchangeData.coinToMoney[0]?.amounts.slice(0, -1));
        const coins = coinExchangeData.coinToMoney[0]?.coins;
        const exchangeValue = (value * coins) / amounts;
        const bonus = (value / Number(bonusData.money.replace(/[^0-9]/g, ''))) * bonusData.coins;
        setCoinExchange(exchangeValue);
        setBonus(bonus >= 20 ? bonus : 0);
      }
    };
    calculateCoinExchange();
  }, [coinExchangeData, bonusData, bonus, coinExchange, inputValue]);
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
          <Typography className='text-gray/4 text-xs font-medium'>{userInfoData?.coins}</Typography>
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
              <div className='flex items-center'>
                <Typography className='text-gray/4 text-xs'>Exchange to:</Typography>
                <img className='w-4 h-4 ml-1' src={coin}></img>
                <Typography className='text-[#D97706] text-xs font-bold'>{coinExchange}</Typography>
              </div>
              <div className='flex items-center'>
                <Typography className='text-gray/4 text-xs'>(Bonus:</Typography>
                <img className='w-4 h-4 mix-blend-luminosity' src={coin}></img>
                <Typography className='text-gray/4 text-xs'>{bonus})</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className='my-4 flex items-start content-start flex-wrap gap-2'>
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
          <Typography className='text-[#D97706] text-xs font-bold'>{bonusData.coins}</Typography>
          <Typography className='text-gray/3 text-xs font-normal ml-1'>
            (for every {bonusData.money} coins)
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
