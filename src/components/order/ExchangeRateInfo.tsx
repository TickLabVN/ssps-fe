import coin from '@assets/coin.png';
import { DocumentTextIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useCoinExchangeStore } from '@states/order';
import { useState } from 'react';

export const ExchangeRateInfo = () => {
  const { coinExchangeData } = useCoinExchangeStore();
  const { coinToMoney, coinToPaper } = coinExchangeData;
  const [chevronIcon, setChevronIcon] = useState(false);
  const CHEVRON_CLASSNAME =
    'w-5 h-5 opacity-40 hover:text-[#0F172A] hover:opacity-100 focus:opacity-100 active:opacity-100';
  const [rateTitleClassName, setRateTitleClassName] = useState(
    'px-6 py-4 flex items-center justify-between cursor-pointer'
  );
  const [rateClassName, setRateClassName] = useState('px-6 pt-4 pb-6 flex flex-col hidden');
  const expandExchangeRate = () => {
    setChevronIcon(!chevronIcon);
    if (!chevronIcon) {
      setRateClassName((prev) => prev.replace('hidden', ''));
      setRateTitleClassName((prev) => prev + ' bg-[#EFF6FF]');
    } else {
      setRateClassName((prev) => prev + ' hidden');
      setRateTitleClassName((prev) => prev.replace('bg-[#EFF6FF]', ''));
    }
  };
  return (
    <Card className='rounded-none shadow-sm'>
      <CardBody className={rateTitleClassName} onClick={expandExchangeRate}>
        <div className='flex items-center'>
          <InformationCircleIcon className='w-5 h-5 text-blue/1 mr-2' />
          <Typography className='text-gray/4 text-base font-medium '>Exchange rate</Typography>
        </div>
        {!chevronIcon ? (
          <ChevronDownIcon className={CHEVRON_CLASSNAME} />
        ) : (
          <ChevronUpIcon className={CHEVRON_CLASSNAME} />
        )}
      </CardBody>
      <CardBody className={rateClassName}>
        <div className='flex items-center justify-between'>
          <Typography className='text-gray/3 text-xs font-normal '>To VND:</Typography>
          <div className='flex items-center'>
            <Typography className='text-gray/4 text-xs font-medium '>
              {coinToMoney[0]?.coins}
            </Typography>
            <img className='w-4 h-4 mix-blend-luminosity' src={coin}></img>
            <Typography className='text-gray/4 text-xs font-medium mx-1'>=</Typography>
            <div className='min-w-[48px] flex justify-end'>
              <Typography className='text-gray/4 text-xs font-medium'>
                {coinToMoney[0]?.amounts}
              </Typography>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <Typography className='text-gray/3 text-xs font-normal '>To A4 paper:</Typography>
          <div className='flex items-center'>
            <Typography className='text-gray/4 text-xs font-medium '>
              {coinToPaper[0]?.coins}
            </Typography>
            <img className='w-4 h-4 mix-blend-luminosity' src={coin}></img>
            <Typography className='text-gray/4 text-xs font-medium mx-1'>=</Typography>
            <div className='min-w-[48px] flex justify-end '>
              <Typography className='text-gray/4 text-xs font-medium'>
                {coinToPaper[0]?.amounts}
              </Typography>
              <DocumentTextIcon className='w-4 h-4 text-gray/4 shrink-0' />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
