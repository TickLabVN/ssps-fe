import { MutableRefObject, useEffect, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Typography } from '@material-tailwind/react';
import {
  ClipboardDocumentListIcon,
  MapPinIcon,
  PrinterIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  EyeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { FormFooter } from '@components/order/common';
import { usePrintingRequestQuery, usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export const ConfirmOrderForm: Component<{ initialTotalCost: MutableRefObject<number> }> = ({
  initialTotalCost
}) => {
  const queryClient = useQueryClient();
  const remainCoins = queryClient.getQueryData<number>(['/api/user/remain-coins']);
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);

  const {
    listFiles: { data: listFiles, isFetching, isError },
    serviceFee: { data: serviceFee }
  } = usePrintingRequestQuery();
  const { executePrintingRequest } = usePrintingRequestMutation();

  const { mobileOrderStep, setMobileOrderStep, setDesktopOrderStep } = useOrderWorkflowStore();
  const { totalCost, setIsOrderUpdate, setIsOrderSuccess, setTotalCost } = useOrderPrintStore();

  useEffect(() => {
    setTotalCost(initialTotalCost.current);
  }, [initialTotalCost, setTotalCost]);

  const handleExistConfirmOrder = () => {
    setIsOrderUpdate(true);
    setMobileOrderStep({
      current: 2,
      prev: 3
    });
    setDesktopOrderStep(1);
  };

  const handleExecutePrintingRequest = async () => {
    if (!printingRequestId) return;
    await executePrintingRequest.mutateAsync(printingRequestId.id);
    setIsOrderSuccess(true);
    setMobileOrderStep({
      current: 5,
      prev: 3
    });
  };

  const ConfirmOrderItem: Component<{ fileExtraMetadata: FileExtraMetadata }> = useMemo(
    () =>
      ({ fileExtraMetadata }) => {
        return (
          <div className='flex gap-4 px-4 py-2 bg-white border-b-2'>
            <div
              className='md:hidden text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer'
              onClick={() => {
                queryClient.setQueryData(['fileURL'], fileExtraMetadata.fileURL);
                setMobileOrderStep({
                  current: 1,
                  prev: mobileOrderStep.current
                });
              }}
            >
              <EyeIcon width={20} />
              <span className='text-xs'>Preview</span>
            </div>
            <div className='w-full'>
              <div className='flex flex-col text-gray/4'>
                <div className='flex items-center gap-1 font-medium'>
                  <p className='max-w-[230px] truncate text-gray/4'>{fileExtraMetadata.fileName}</p>
                  <p className='text-gray/3'>{`(${formatFileSize(fileExtraMetadata.fileSize)})`}</p>
                </div>
                <p className='flex items-center gap-1 text-sm mb-5'>
                  <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                  <span className='text-gray/4 font-normal'>
                    {fileExtraMetadata.fileCoin + ' x ' + fileExtraMetadata.numOfCopies + ' copies'}
                  </span>
                </p>
              </div>
              <div className='flex flex-col items-end text-sm'>
                <p className='text-gray/4 font-medium'>Charge price</p>
                <div className='flex items-center gap-1'>
                  <img src={coinImage} alt='coinImage' className='w-6 h-6' />
                  <span className='text-yellow/1 font-bold'>
                    {fileExtraMetadata.fileCoin * fileExtraMetadata.numOfCopies}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      },
    [mobileOrderStep, queryClient, setMobileOrderStep]
  );

  return (
    <div className='text-gray-4'>
      <div className='px-6 py-3 shadow-md font-semibold bg-white mb-6'>
        <div className='flex items-center'>
          <ChevronLeftIcon onClick={handleExistConfirmOrder} className='w-6 h-6 cursor-pointer' />
          <Typography className='ml-4 font-bold text-gray/4'>Confirm order</Typography>
        </div>
      </div>
      <div>
        <div className='flex px-6 py-4 items-center bg-white'>
          <PrinterIcon strokeWidth={2} className='w-6 h-6 mr-2 text-blue-500' />
          <p className='text-gray/4 text-base font-medium'>Document</p>
        </div>
        <div className='mb-4'>
          {isFetching ? (
            listFiles?.map((item, index) => (
              <div key={index}>
                <ConfirmOrderItem fileExtraMetadata={item} />
              </div>
            ))
          ) : isError ? (
            <div className='grid justify-items-center items-center bg-gray-100'>
              <Typography variant='h6' color='red'>
                Không thể tải danh sách các files trong đơn hàng.
              </Typography>
            </div>
          ) : (
            listFiles?.map((item, index) => (
              <div key={index}>
                <ConfirmOrderItem fileExtraMetadata={item} />
              </div>
            ))
          )}
        </div>
        <div className='bg-white mb-4 px-6 py-4'>
          <div className='flex items-center mb-4'>
            <MapPinIcon strokeWidth={2} className='w-6 h-6 mr-2 text-blue-500' />
            <p className='text-gray/4 text-base font-medium'>Pick-up location</p>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <Typography variant='h6'>Tiệm in thư viện H3, tầng 1</Typography>
            <QuestionMarkCircleIcon width={24} className='cursor-pointer' />
          </div>
        </div>
        <div className='px-6 py-4 bg-white mb-4'>
          <div className='flex items-center'>
            <WalletIcon strokeWidth={2} className='w-6 h-6 mr-2 text-blue-500' />
            <p className='text-gray/4 text-base font-medium'>Payment method</p>
          </div>
          <div
            className='flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-full'
            onClick={() => {
              setMobileOrderStep({
                current: 4,
                prev: 3
              });
              setDesktopOrderStep(3);
            }}
          >
            <Typography variant='h6'>Print wallet</Typography>
            <ChevronRightIcon className='w-5 h-5' />
          </div>
          <div className='flex items-center mb-4 px-2'>
            <Typography className='mr-2 text-sm'>Balance:</Typography>
            <div className='flex items-center'>
              <img src={coinImage} alt='coinImage' className='w-6 h-6' />
              <span className='text-yellow/1 font-bold'>{remainCoins}</span>
            </div>
          </div>
          {remainCoins !== undefined && remainCoins < totalCost + (serviceFee ?? 0) && (
            <Alert className='bg-red-50 text-red-600 mb-4'>
              <div className='flex items-center gap-1'>
                <ExclamationCircleIcon className='w-6 h-6' />
                <Typography className='text-sm font-bold'>Amount exceed balance!</Typography>
              </div>
              <Typography className='text-sm font-normal'>
                Top up your account to proceed.
              </Typography>
            </Alert>
          )}
        </div>
        <div className='px-6 py-4 bg-white mb-4'>
          <div className='flex mb-4'>
            <ClipboardDocumentListIcon strokeWidth={2} className='w-6 h-6 mr-2 text-blue-500' />
            <p className='text-gray/4 text-base font-medium'>Charge Details</p>
          </div>
          <ul>
            <li className='flex justify-between mb-1'>
              <Typography variant='small' className='font-medium'>
                Print fee
              </Typography>
              <p className='flex items-center gap-1 text-sm'>
                <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                <span className='text-gray/4 font-normal'>{totalCost}</span>
              </p>
            </li>
            <li className='flex justify-between mb-1'>
              <Typography variant='small' className='font-medium'>
                Service fee
              </Typography>
              <p className='flex items-center gap-1 text-sm'>
                <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                <span className='text-gray/4 font-normal'>{serviceFee ?? 0}</span>
              </p>
            </li>
            <li className='flex justify-between'>
              <Typography variant='paragraph' className='font-bold'>
                Total Cost
              </Typography>
              <p className='flex items-center gap-1'>
                <img src={coinImage} alt='coinImage' className='w-6 h-6' />
                <span className='text-yellow/1 font-bold'>{totalCost + (serviceFee ?? 0)}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <FormFooter totalCost={totalCost + (serviceFee ?? 0)}>
        <Button
          color={
            remainCoins !== undefined && remainCoins >= totalCost + (serviceFee ?? 0)
              ? 'blue'
              : 'gray'
          }
          className='rounded-none w-[30%]'
          onClick={handleExecutePrintingRequest}
          disabled={!remainCoins || remainCoins < totalCost + (serviceFee ?? 0)}
        >
          <span className='text-base'>Confirm</span>
        </Button>
      </FormFooter>
    </div>
  );
};
