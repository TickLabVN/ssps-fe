import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useBonusStore, useCoinExchangeStore, useOrderWorkflowStore } from '@states/order';
import { useEffect } from 'react';
import { ExchangeRateInfo } from './ExchangeRateInfo';
import { PaymentMethod } from './PaymentMethod';
import { TopupWalletInput } from './TopupWalletInput';
// Tue's first-task in here.
export function TopupWalletForm() {
  const { setOrderStep } = useOrderWorkflowStore();
  const { getCoinExchangeData } = useCoinExchangeStore();
  const { getBonusData } = useBonusStore();
  useEffect(() => {
    getBonusData();
    getCoinExchangeData();
  }, [getBonusData, getCoinExchangeData]);
  return (
    <>
      {/* // Header */}
      <Card className='rounded-none shadow-md'>
        <CardBody className='px-6 py-4'>
          <div className='flex items-center'>
            <ChevronLeftIcon
              className='w-7 h-7 mr-4 opacity-40 hover:opacity-100 focus:opacity-100 active:opacity-100 cursor-pointer'
              onClick={() => setOrderStep(2)}
            />
            <Typography className='text-gray/4 text-base font-semibold '>Top up wallet</Typography>
          </div>
        </CardBody>
      </Card>

      {/* // Exchange rate */}

      <div className='w-screen py-6'>
        <ExchangeRateInfo />
        {/* // Top up amount */}
        <TopupWalletInput />
        {/* // Payment Method */}
        <PaymentMethod />
      </div>
      {/* // Footer */}
      <footer className='relative w-full'>
        <Button
          className='w-full px-4 py-8 bg-blue/1 rounded-none focus:bg-blue/2 active:bg-blue-2 sticky'
          onClick={() => setOrderStep(3)}
        >
          Top up wallet
        </Button>
      </footer>
    </>
  );
}
