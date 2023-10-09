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
  const rateTitleClassName = `px-6 py-4 flex items-center justify-between cursor-pointer ${
    chevronIcon ? 'bg-[#EFF6FF]' : ''
  }`;
  const rateClassName = `px-6 pt-4 pb-6 flex flex-col ${!chevronIcon ? 'hidden' : ''}`;
  const expandExchangeRate = () => {
    setChevronIcon(!chevronIcon);
  };
  const ExchangeRateRow: Component<{
    title: string;
    coins: number;
    amount: string;
    paper: boolean;
  }> = ({ title, coins, amount, paper }) => {
    return (
      <div className='flex items-center justify-between'>
        <Typography className='text-gray/3 text-xs font-normal '>{title}</Typography>
        <div className='flex items-center'>
          <Typography className='text-gray/4 text-xs font-medium '>{coins}</Typography>
          <img className='w-4 h-4 mix-blend-luminosity' src={coin}></img>
          <Typography className='text-gray/4 text-xs font-medium mx-1'>=</Typography>
          <div className='min-w-[48px] flex justify-end'>
            <Typography className='text-gray/4 text-xs font-medium'>{amount}</Typography>
            {paper && <DocumentTextIcon className='w-4 h-4 text-gray/4 ml-1' />}
          </div>
        </div>
      </div>
    );
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
        <ExchangeRateRow
          title='To VND'
          coins={coinToMoney.coins}
          amount={`${coinToMoney.amounts.toLocaleString()}đ`}
          paper={false}
        />
        <ExchangeRateRow
          title='To A4 paper'
          coins={coinToPaper.coins}
          amount={`${coinToPaper.amounts.toLocaleString()} A4`}
          paper={true}
        />
      </CardBody>
    </Card>
  );
};
