import VNPay from '@assets/VNPay.png';
import momo from '@assets/momo.png';
import zaloPay from '@assets/zaloPay.png';
import { WalletIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, Radio, Typography } from '@material-tailwind/react';
export function PaymentMethod() {
  return (
    <Card className='rounded-none shadow-sm my-4'>
      <CardBody className='px-6 py-4 flex items-center'>
        <WalletIcon className='w-5 h-5 text-blue/1 mr-2' />
        <Typography className='text-gray/4 text-base font-medium '>Payment Method</Typography>
      </CardBody>
      <CardBody className='px-6 py-4 flex items-center'>
        <Radio
          name='payment'
          className=''
          containerProps={{
            className: 'p-0'
          }}
          crossOrigin={undefined}
        />
        <div className='flex items-center select-none'>
          <img className='w-8 h-8 ml-4 mr-2 object-cover' src={momo}></img>
          <div className='flex flex-col justify-between items-start'>
            <Typography className='text-gray/4 text-xs font-normal '>
              Pay with Momo wallet
            </Typography>
            <Typography className='text-gray/3 text-xs font-normal'>Redirect to Momo</Typography>
          </div>
        </div>
      </CardBody>
      <CardBody className='px-6 py-4 flex items-center'>
        <Radio
          name='payment'
          containerProps={{
            className: 'p-0'
          }}
          crossOrigin={undefined}
        />
        <div className='flex items-center select-none'>
          <img className='w-8 h-8 ml-4 mr-2 object-cover' src={zaloPay}></img>
          <div className='flex flex-col justify-between items-start'>
            <Typography className='text-gray/4 text-xs font-normal '>
              Pay with Zalo wallet
            </Typography>
            <Typography className='text-gray/3 text-xs font-normal'>
              Redirect to Zalo Pay
            </Typography>
          </div>
        </div>
      </CardBody>
      <CardBody className='px-6 py-4 flex items-center select-none'>
        <Radio
          name='payment'
          containerProps={{
            className: 'p-0'
          }}
          crossOrigin={undefined}
        />
        <div className='flex items-center'>
          <img className='w-8 h-8 ml-4 mr-2 object-cover' src={VNPay}></img>
          <div className='flex flex-col justify-between items-start'>
            <Typography className='text-gray/4 text-xs font-normal '>
              Pay with VNPay wallet
            </Typography>
            <Typography className='text-gray/3 text-xs font-normal'>Redirect to VNPay</Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
