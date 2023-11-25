// import { useOrderWorkflowStore } from '@states/order';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import coin from '@assets/coin.png';
// Tue's second-task in here.
export function OrderSuccessForm() {
  //   const { setOrderStep } = useOrderWorkflowStore();
  const detail_order = [
    {
      name: 'Order number',
      detail: '#1234-5678'
    },
    {
      name: 'Pick-up location',
      detail: 'Tiệm in thư viện H3, tầng 1'
    },
    {
      name: 'Print cost',
      detail: '2.400',
      coin: true
    },
    {
      name: 'Service cost',
      detail: '2',
      coin: true
    },
    {
      name: 'Total',
      detail: '2.402',
      coin: true
    }
  ];
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <Card className='w-[576px]'>
          <div className='flex flex-col justify-center items-center pt-6 mb-[64px]'>
            <div className='w-[88px] h-[88px] p-5 rounded-full bg-[#DBEAFE]'>
              <CheckIcon className='w-12 h-12 text-blue/1' />
            </div>
            <Typography className='text-blue/1 text-2xl font-bold mt-4'>
              Your payment success
            </Typography>
          </div>
          <Card className='rounded-none shadow-none'>
            <CardBody>
              <div className='flex items-center'>
                <DocumentChartBarIcon className='w-5 h-5 text-blue/1 mr-2' />
                <Typography className='text-gray/4 text-base font-medium '>
                  Order details
                </Typography>
              </div>
            </CardBody>
            <CardBody className='py-4 relative'>
              <hr className='absolute w-[328px] border border-gray/2  top-[94px]' />
              <div className='flex flex-col items-stretch items-start gap-1'>
                {detail_order.map((item, index) => (
                  <div className='flex justify-between' key={index}>
                    <Typography className='min-w-2/5 text-gray/4 text-base font-normal'>
                      {`${item.name}:`}
                    </Typography>
                    <div className='flex basis-1/2 items-center text-right justify-end'>
                      {item.coin && (
                        <img
                          className={index === 4 ? 'w-4 h-4' : 'w-4 h-4 mix-blend-luminosity'}
                          src={coin}
                        ></img>
                      )}
                      <Typography
                        className={
                          index === 4
                            ? 'text-[#D97706] text-base font-bold'
                            : 'text-gray/4 text-base font-medium '
                        }
                      >
                        {item.detail}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
            <div className='mt-4 flex flex-col items-center'>
              <Button
                className='px-4 py-2 rounded-lg bg-blue/1 h-[40px] normal-case hover:shadow-none'
                ripple={false}
                // onClick={()}
              >
                Track this order
              </Button>
              <Button
                className='px-4 py-2 rounded-lg h-[40px] text-gray/3 text-sm font-semibold mt-2 normal-case hover:border hover:border-blue/1 hover:bg-white'
                variant='text'
                ripple={false}
                // onClick={()}
              >
                Return home
              </Button>
            </div>
          </Card>
        </Card>
      </div>
    </>
  );
}
