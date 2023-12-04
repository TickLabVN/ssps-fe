import { ReactElement, useState, useRef, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Alert, Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import paypal from '@assets/paypal.png';
import { SUGGEST_AMOUNT } from '@constants';
import { usePrintingRequestQuery, usePrintingRequestMutation } from '@hooks';
import { useOrderWorkflowStore } from '@states';

export function TopupWalletForm() {
  const queryClient = useQueryClient();
  const {
    exchangeRate: [coinPerPage, coinPerDollar]
  } = usePrintingRequestQuery();
  const { createPayPalOrder, approvePayPalOrder } = usePrintingRequestMutation();
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const ExchangeRateInfo = () => {
    const CHEVRON_CLASSNAME =
      'w-5 h-5 opacity-40 hover:text-[#0F172A] hover:opacity-100 focus:opacity-100 active:opacity-100';
    const [chevronIcon, setChevronIcon] = useState<boolean>(false);

    const ExchangeRateRow: Component<{ title: string; coins?: number; children: ReactElement }> =
      useMemo(
        () =>
          ({ title, coins, children }) => (
            <div className='flex items-center justify-between'>
              <p className='text-gray/3 text-xs font-normal'>{title}</p>
              <div className='flex items-center'>
                {coins !== undefined && <p className='text-gray/4 text-xs font-medium'>{coins}</p>}
                <img className='w-4 h-4 mix-blend-luminosity' src={coinImage} alt='coinImage'></img>
                <p className='text-gray/4 text-xs font-medium mx-1'>=</p>
                <div className='min-w-[48px] flex justify-end'>
                  <p className='text-gray/4 text-xs font-medium'>1</p>
                  {children}
                </div>
              </div>
            </div>
          ),
        []
      );

    return (
      <Card className='rounded-none shadow-sm'>
        <CardBody className='p-0'>
          <div
            className={`px-6 py-4 flex items-center justify-between cursor-pointer ${
              chevronIcon ? 'bg-[#EFF6FF]' : ''
            }`}
            onClick={() => setChevronIcon(!chevronIcon)}
          >
            <div className='flex items-center'>
              <InformationCircleIcon strokeWidth={2} className='w-5 h-5 text-blue/1 mr-2' />
              <p className='text-gray/4 text-base font-medium '>Exchange rate</p>
            </div>
            {!chevronIcon ? (
              <ChevronDownIcon className={CHEVRON_CLASSNAME} />
            ) : (
              <ChevronUpIcon className={CHEVRON_CLASSNAME} />
            )}
          </div>
          <div className={`px-6 pt-4 pb-6 flex flex-col ${!chevronIcon ? 'hidden' : ''}`}>
            <ExchangeRateRow
              title='To Dollar:'
              coins={coinPerDollar.data}
              children={<CurrencyDollarIcon className='w-4 h-4 text-gray/4' />}
            />
            <ExchangeRateRow
              title='To A4 paper:'
              coins={coinPerPage.data}
              children={
                <>
                  <p className='text-gray/4 text-xs font-medium'>A4</p>
                  <DocumentTextIcon className='w-4 h-4 text-gray/4' />
                </>
              }
            />
          </div>
        </CardBody>
      </Card>
    );
  };

  const TopupAmountInput = () => {
    const remainCoins = queryClient.getQueryData<number>(['/api/user/remain-coins']);
    const [amountInputValue, setAmountInputValue] = useState<string>('');
    const [showInfo, setShowInfo] = useState<boolean>(false);

    return (
      <Card className='rounded-none shadow-sm my-4'>
        <CardBody className='p-0'>
          <div className='px-6 py-4 flex items-center'>
            <BanknotesIcon strokeWidth={2} className='w-5 h-5 text-blue/1 mr-2' />
            <p className='text-gray/4 text-base font-medium '>Top up wallet</p>
          </div>
        </CardBody>
        <div className='px-6 pt-0 pb-6'>
          <div className='flex items-center'>
            <p className='text-gray/4 text-xs font-medium'>Current balance:</p>
            <img
              className='w-4 h-4 mix-blend-luminosity ml-1'
              src={coinImage}
              alt='coinImage'
            ></img>
            <p className='text-gray/4 text-xs font-medium'>{remainCoins}</p>
          </div>
          <div className='relative'>
            <Input
              color='blue'
              label='Top up Amount'
              value={amountInputValue}
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
                setAmountInputValue(e.target.value);
                setShowInfo(true);
              }}
              maxLength={10}
            />
            <div className={showInfo ? '' : 'hidden'}>
              <XMarkIcon
                className='w-7 h-7 text-gray/4 absolute right-4 top-4 cursor-pointer'
                onClick={() => {
                  setAmountInputValue('');
                  setShowInfo(false);
                }}
              />
              <div className='px-4 absolute flex justify-between w-full left-0 bottom-3'>
                <div className='flex items-center flex-wrap'>
                  <p className='text-gray/4 text-xs'>Exchange to:</p>
                  <img className='w-4 h-4 ml-1' src={coinImage} alt='coinImage'></img>
                  <p className='text-[#D97706] text-xs font-bold'>
                    {Math.floor(
                      parseFloat(amountInputValue.replace(/[^0-9.]/g, '') || '0') *
                        (coinPerDollar.data ?? 1)
                    )}
                  </p>
                </div>
                <div className='flex items-center flex-wrap'>
                  <p className='text-gray/4 text-xs'>(Bonus:</p>
                  <img
                    className='w-4 h-4 mix-blend-luminosity'
                    src={coinImage}
                    alt='coinImage'
                  ></img>
                  <Typography className='text-gray/4 text-xs'>
                    {Math.floor(parseInt(amountInputValue.replace(/[^0-9.]/g, '') || '0') / 10) *
                      (coinPerDollar.data ?? 1)}
                    )
                  </Typography>
                </div>
              </div>
              {parseFloat(amountInputValue.replace(/[^0-9.]/g, '') || '0') < 1 && (
                <Alert className='bg-red-50 text-red-600 p-2'>
                  <div className='flex items-center'>
                    <ExclamationTriangleIcon className='w-5 h-5 mr-2' />
                    <Typography variant='small'>Minimum amount is {SUGGEST_AMOUNT[0]}</Typography>
                  </div>
                </Alert>
              )}
            </div>
          </div>
          <div
            className={
              showInfo && parseFloat(amountInputValue.replace(/[^0-9.]/g, '') || '0') < 1
                ? 'mt-6 mb-4 flex items-start content-start flex-wrap gap-2'
                : 'my-4 flex items-start content-start flex-wrap gap-2'
            }
          >
            {SUGGEST_AMOUNT.map((item, index) => (
              <Button
                key={index}
                className='flex items-center p-2 rounded-lg bg-[#DBEAFE] text-base font-semibold text-blue/1 shadow-none normal-case'
                onClick={() => {
                  setAmountInputValue(item);
                  setShowInfo(true);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className='flex'>
            <Typography className='text-gray/4 text-xs font-medium flex'>Bonus:</Typography>
            <img className='w-4 h-4' src={coinImage} alt='coinImage'></img>
            <Typography className='text-[#D97706] text-xs font-bold'>
              {coinPerDollar.data ? coinPerDollar.data : 0}
            </Typography>
            <Typography className='text-gray/3 text-xs font-normal ml-1'>
              (for every 10$)
            </Typography>
          </div>
        </div>
      </Card>
    );
  };

  const PaymentMethod = useMemo(
    () => () => (
      <Card className='rounded-none shadow-sm'>
        <CardBody className='p-0'>
          <div className='px-6 py-4 flex items-center'>
            <WalletIcon strokeWidth={2} className='w-5 h-5 text-blue/1 mr-2' />
            <p className='text-gray/4 text-base font-medium '>Payment Method</p>
          </div>
          <div className='px-6 pb-4 flex items-center'>
            <div className='flex items-center gap-2'>
              <img className='w-16 object-cover' src={paypal} alt='paypal'></img>
              <div className='flex flex-col justify-between items-start'>
                <p className='text-gray/4 text-sm font-normal '>Pay with PayPal wallet</p>
                <p className='text-gray/3 text-sm font-normal'>Redirect to PayPal</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    ),
    []
  );

  return (
    <>
      <Card className='rounded-none shadow-md'>
        <CardBody className='px-6 py-4'>
          <div className='flex items-center'>
            <ChevronLeftIcon
              className='w-7 h-7 mr-4 opacity-40 hover:opacity-100 focus:opacity-100 active:opacity-100 cursor-pointer'
              onClick={() =>
                setMobileOrderStep({
                  current: 3,
                  prev: 4
                })
              }
            />
            <Typography className='text-gray/4 text-base font-semibold '>Top up wallet</Typography>
          </div>
        </CardBody>
      </Card>
      <div className='w-screen py-6'>
        <ExchangeRateInfo />
        <TopupAmountInput />
        <PaymentMethod />
      </div>
      <PayPalButtons
        fundingSource='paypal'
        style={{ color: 'blue' }}
        createOrder={() =>
          createPayPalOrder.mutateAsync(
            parseFloat(inputRef.current?.value.replace(/[^0-9.]/g, '') || '0')
          )
        }
        onApprove={async () => {
          const paypalOrderId = queryClient.getQueryData<string>(['paypalOrderId']);
          if (!paypalOrderId) return;
          await approvePayPalOrder.mutateAsync(paypalOrderId);
          setMobileOrderStep({
            current: 3,
            prev: 4
          });
        }}
      />
    </>
  );
}
