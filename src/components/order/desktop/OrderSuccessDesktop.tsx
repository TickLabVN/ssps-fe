import { MutableRefObject, useState } from 'react';
import { Button, Card, CardBody, Dialog, DialogBody, Typography } from '@material-tailwind/react';
import { CheckIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import coinImage from '@assets/coin.png';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export function useOrderSuccessDesktop() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const OrderSuccessDesktop: Component<{
    initialTotalCost: MutableRefObject<number>;
    serviceFee?: number;
  }> = ({ initialTotalCost, serviceFee }) => {
    const { totalCost, setTotalCost, setIsFileUploadSuccess } = useOrderPrintStore();
    const { setDesktopOrderStep } = useOrderWorkflowStore();

    const handleExistOrderSuccessForm = () => {
      setIsFileUploadSuccess(false);
      setTotalCost(0);
      initialTotalCost.current = 0;
      setDesktopOrderStep(0);
      setOpenDialog(false);
    };

    return (
      <Dialog
        size='xs'
        open={openDialog}
        handler={() => setOpenDialog(false)}
        dismiss={{
          escapeKey: false,
          outsidePress: false
        }}
      >
        <DialogBody>
          <div className='w-full flex flex-col justify-center items-center h-32 overscroll-y-auto'>
            <div className='p-5 rounded-full bg-[#DBEAFE]'>
              <CheckIcon className='w-12 h-12 text-blue/1' />
            </div>
            <Typography className='text-blue/1 text-2xl font-bold mt-4'>
              Your payment success
            </Typography>
          </div>
          <Card className='rounded-none shadow-none'>
            <CardBody>
              <div className='flex items-center'>
                <DocumentChartBarIcon strokeWidth={2} className='w-5 h-5 text-blue/1 mr-2' />
                <p className='text-gray/4 text-lg font-medium '>Order details</p>
              </div>
              <div className='py-8'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between items-center'>
                    <p className='text-gray/4 text-base font-normal'>Order number:</p>
                    <p className='text-gray/4 text-base font-medium'>{`#1234-5678`}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-gray/4 text-base font-normal'>Pick-up location:</p>
                    <p className='text-gray/4 text-base font-medium'>Tiệm in thư viện H3, tầng 1</p>
                  </div>
                  <hr className='w-full border border-gray/2 my-2' />
                  <ul>
                    <li className='flex justify-between mb-1'>
                      <Typography variant='paragraph' className='font-medium'>
                        Print cost:
                      </Typography>
                      <p className='flex items-center gap-1 text-sm'>
                        <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                        <span className='text-gray/4 font-normal'>{totalCost}</span>
                      </p>
                    </li>
                    <li className='flex justify-between mb-1'>
                      <Typography variant='paragraph' className='font-medium'>
                        Service cost:
                      </Typography>
                      <p className='flex items-center gap-1 text-sm'>
                        <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                        <span className='text-gray/4 font-normal'>{serviceFee ?? 0}</span>
                      </p>
                    </li>
                    <li className='flex justify-between'>
                      <Typography variant='paragraph' className='font-bold'>
                        Total cost:
                      </Typography>
                      <p className='flex items-center gap-1'>
                        <img src={coinImage} alt='coinImage' className='w-6 h-6' />
                        <span className='text-yellow/1 font-bold'>
                          {totalCost + (serviceFee ?? 0)}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className='flex flex-col items-center'>
            <Button
              className='px-4 py-2 rounded-lg bg-blue/1 normal-case text-sm hover:shadow-none'
              onClick={handleExistOrderSuccessForm}
            >
              Track this order
            </Button>
            <Button
              className='px-4 py-2 rounded-lg text-gray/3 text-sm font-semibold mt-2 normal-case hover:border hover:border-blue/1 hover:bg-white'
              variant='text'
              onClick={handleExistOrderSuccessForm}
            >
              Return home
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openOrderSuccessDesktop: () => setOpenDialog(true),
    OrderSuccessDesktop: OrderSuccessDesktop
  };
}
