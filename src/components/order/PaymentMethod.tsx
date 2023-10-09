import { WalletIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, Radio, Typography } from '@material-tailwind/react';
import { PAYMENT_METHOD } from '@constants';
export function PaymentMethod() {
  return (
    <Card className='rounded-none shadow-sm my-4'>
      <CardBody className='px-6 py-4 flex items-center'>
        <WalletIcon className='w-5 h-5 text-blue/1 mr-2' />
        <Typography className='text-gray/4 text-base font-medium '>Payment Method</Typography>
      </CardBody>
      {PAYMENT_METHOD.map((method: paymentMethod, index: number) => (
        <CardBody className='px-6 py-4 flex items-center' key={index}>
          <Radio
            name='payment'
            className=''
            containerProps={{
              className: 'p-0'
            }}
            crossOrigin={undefined}
          />
          <div className='flex items-center select-none'>
            <img className='w-8 h-8 ml-4 mr-2 object-cover' src={method.img}></img>
            <div className='flex flex-col justify-between items-start'>
              <Typography className='text-gray/4 text-xs font-normal '>{method.name}</Typography>
              <Typography className='text-gray/3 text-xs font-normal'>
                {method.description}
              </Typography>
            </div>
          </div>
        </CardBody>
      ))}
    </Card>
  );
}
