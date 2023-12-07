import { MutableRefObject, useEffect, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable
} from '@tanstack/react-table';
import { Alert, Button, Typography } from '@material-tailwind/react';
import {
  ClipboardDocumentListIcon,
  MapPinIcon,
  PrinterIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import {
  ChevronRightIcon,
  ExclamationCircleIcon,
  EyeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { usePrintingRequestQuery, usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';
import { usePreviewDocumentDesktop } from './PreviewDocumentDesktop';

export const ConfirmOrderDektop: Component<{
  initialTotalCost: MutableRefObject<number>;
  handleOpenOrderSuccessDesktop: () => void;
}> = ({ initialTotalCost, handleOpenOrderSuccessDesktop }) => {
  const queryClient = useQueryClient();
  const remainCoins = queryClient.getQueryData<number>(['/api/user/remain-coins']);
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);

  const {
    listFiles: { data: listFiles },
    serviceFee: { data: serviceFee }
  } = usePrintingRequestQuery();
  const { executePrintingRequest } = usePrintingRequestMutation();

  const { openPreviewDocumentDesktop, PreviewDocumentDesktop } = usePreviewDocumentDesktop();

  const { totalCost, setTotalCost, setIsOrderSuccess } = useOrderPrintStore();
  const { setDesktopOrderStep, setMobileOrderStep } = useOrderWorkflowStore();

  useEffect(() => {
    setTotalCost(initialTotalCost.current);
  }, [initialTotalCost, setTotalCost]);

  const handleExecutePrintingRequest = async () => {
    if (!printingRequestId) return;
    await executePrintingRequest.mutateAsync(printingRequestId.id);
    setIsOrderSuccess(true);
    setMobileOrderStep({
      current: 5,
      prev: 3
    });
    handleOpenOrderSuccessDesktop();
  };

  const columnHelper = createColumnHelper<FileExtraMetadata>();

  const columnDefs = useMemo(
    () => [
      columnHelper.accessor('fileId', {
        header: 'TÀI LIỆU ĐẶT IN',
        cell: (info) => (
          <div className='flex gap-4 px-4 py-2'>
            <div
              className='text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer h-28 w-20'
              onClick={() => {
                queryClient.setQueryData(['fileURL'], info.row.original.fileURL);
                openPreviewDocumentDesktop();
              }}
            >
              <EyeIcon width={20} />
              <span className='text-xs'>Preview</span>
            </div>
            <div className='w-full'>
              <div className='flex flex-col text-gray/4'>
                <div className='flex items-center gap-1 font-medium text-xl'>
                  <p className='max-w-[256px] truncate text-blue/1 font-semibold'>
                    {info.row.original.fileName}
                  </p>
                  <p className='text-gray/3'>{`(${formatFileSize(info.row.original.fileSize)})`}</p>
                </div>
                <div className='flex items-center gap-1 text-base'>
                  <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                  <span className='text-gray/4 font-normal'>{info.row.original.fileCoin}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('numOfCopies', {
        header: 'SỐ LƯỢNG',
        cell: (info) => <span className='flex justify-center'>x{info.getValue()}</span>
      }),
      columnHelper.accessor('fileCoin', {
        header: 'THÀNH TIỀN',
        cell: (info) => (
          <div className='flex items-center gap-1 text-sm justify-center'>
            <img src={coinImage} alt='coinImage' className='w-6 h-6' />
            <span className='text-yellow/1 font-bold text-xl'>
              {info.row.original.fileCoin * info.row.original.numOfCopies}
            </span>
          </div>
        )
      })
    ],
    [columnHelper, queryClient, openPreviewDocumentDesktop]
  );

  const fileTable = useReactTable<FileExtraMetadata>({
    columns: columnDefs,
    data: listFiles ?? [],
    getCoreRowModel: getCoreRowModel<RowModel<FileExtraMetadata>>()
  });

  return (
    <>
      <div className='grid grid-cols-3 gap-6 pt-4 px-12'>
        <div className='bg-white col-span-2 rounded-t-lg'>
          <div className='px-6 py-4 flex text-blue/1'>
            <PrinterIcon className='w-6 h-6' />
            <p className='ml-2 text-base font-medium text-gray/4'>Document</p>
          </div>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              {fileTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='border-b border-blue-gray-100 bg-gray/2'
                    >
                      {header.isPlaceholder ? null : (
                        <Typography
                          variant='paragraph'
                          color='blue-gray'
                          className={
                            'text-center font-semibold leading-none opacity-70 p-4' +
                            (index < headerGroup.headers.length - 1 && ' border-r border-gray/3')
                          }
                        >
                          {flexRender(header.column.columnDef.header, header.getContext()) ?? ''}
                        </Typography>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='bg-white'>
              {fileTable.getRowModel().rows.map((row) => (
                <tr key={row.id} className='border-b-2'>
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col bg-white'>
            <div className='flex items-center px-6 py-4'>
              <MapPinIcon className='w-6 h-6 text-blue/1' />
              <p className='ml-2 text-base font-medium text-gray/4'>Pick-up location</p>
            </div>
            <div className='px-6 pb-4 flex items-center justify-between'>
              <p className='text-base font-normal text-gray/4'>Tiệm in thư viện H3, tầng 1</p>
              <QuestionMarkCircleIcon className='w-7 h-7 opacity-40 cursor-pointer focus:opacity-100 active:opacity-100' />
            </div>
          </div>
          <div className='flex flex-col bg-white'>
            <div className='flex items-center px-6 py-4'>
              <WalletIcon className='w-6 h-6 text-blue/1' />
              <p className='ml-2 text-base font-medium text-gray/4'>Payment method</p>
            </div>
            <div className='px-6 pb-4'>
              <div className='flex flex-col'>
                <div
                  className='flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-full'
                  onClick={() => {
                    setDesktopOrderStep(3);
                    setMobileOrderStep({
                      current: 4,
                      prev: 3
                    });
                  }}
                >
                  <p className='text-base font-medium text-gray/4'>Print wallet</p>
                  <ChevronRightIcon className='w-7 h-7 opacity-40 focus:opacity-100 active:opacity-100 cursor-pointer' />
                </div>
                <div className='flex items-center px-2'>
                  <p className='text-base font-medium text-gray/4'>Current balance:</p>
                  <img src={coinImage} alt='Coin Icon' className='w-6 h-6 mr-1' />
                  <p className='text-base font-bold text-[#D97706]'>{remainCoins}</p>
                </div>
                {remainCoins !== undefined && remainCoins < totalCost + (serviceFee ?? 0) && (
                  <Alert className='bg-red-50 text-red-600 my-3'>
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
            </div>
          </div>
          <div className='flex flex-col bg-white rounded-b-lg'>
            <div className='flex px-6 py-4'>
              <ClipboardDocumentListIcon className='w-6 h-6 text-blue/1 mr-3' />
              <span className='text-base font-medium text-gray/4'>Charge Details</span>
            </div>
            <div className='px-6 pb-6'>
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
            <Button
              className='uppercase font-bold text-white text-lg w-full rounded-t-none'
              color={
                remainCoins !== undefined && remainCoins >= totalCost + (serviceFee ?? 0)
                  ? 'blue'
                  : 'gray'
              }
              onClick={handleExecutePrintingRequest}
              disabled={!remainCoins || remainCoins < totalCost + (serviceFee ?? 0)}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
      {<PreviewDocumentDesktop />}
    </>
  );
};
