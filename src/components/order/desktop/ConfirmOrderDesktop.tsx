import { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button, Typography } from '@material-tailwind/react';
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
import { useOrderPrintStore } from '@states';
import { formatFileSize } from '@utils';

export function ConfirmOrderDektop() {
  const { totalCost } = useOrderPrintStore();

  const User_Balance = 200;
  const FEE = [
    { name: 'Print fee', price: 2400 },
    { name: 'Service fee', price: 2 }
  ];
  const columnHelper = createColumnHelper<FileExtraMetadata>();

  const columnDefs = useMemo(
    () => [
      columnHelper.accessor(
        (row) => (
          <div className='flex gap-4 px-4 py-2'>
            <div className='text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer h-28 w-20'>
              <EyeIcon width={20} />
              <span className='text-xs'>Preview</span>
            </div>
            <div className='w-full'>
              <div className='flex flex-col text-gray/4'>
                <div className='flex items-center gap-1 font-medium text-xl'>
                  <p className='max-w-[256px] truncate text-blue/1 font-semibold'>{row.fileName}</p>
                  <p className='text-gray/3'>{`(${formatFileSize(row.fileSize)})`}</p>
                </div>
                <div className='flex items-center gap-1 text-base'>
                  <img src={coinImage} alt='coinImage' className='grayscale w-6 h-6' />
                  <span className='text-gray/4 font-normal'>{row.fileCoin}</span>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          id: 'file',
          header: 'TÀI LIỆU ĐẶT IN',
          cell: (info) => info.getValue()
        }
      ),
      columnHelper.accessor('numOfCopies', {
        header: 'SỐ LƯỢNG',
        cell: (info) => <span className='flex justify-center'>x{info.getValue()}</span>
      }),
      columnHelper.accessor('fileCoin', {
        header: 'THÀNH TIỀN',
        cell: (info) => (
          <div className='flex items-center gap-1 text-sm justify-center'>
            <img src={coinImage} alt='coinImage' className='w-6 h-6' />
            <span className='text-yellow/1 font-bold text-xl'>{info.getValue()}</span>
          </div>
        )
      })
    ],
    [columnHelper]
  );

  const defaultData = useMemo(
    () => [
      {
        fileId: '0',
        fileName: 'filename.csvfilename.csvfilename.csv',
        numPage: 1,
        fileURL: 'http://localhost:3000',
        fileSize: 1024,
        fileCoin: 200,
        numOfCopies: 1
      },
      {
        fileId: '1',
        fileName: 'filename.csv',
        numPage: 1,
        fileURL: 'http://localhost:3000',
        fileSize: 1024,
        fileCoin: 200,
        numOfCopies: 1
      },
      {
        fileId: '2',
        fileName: 'filename.csv',
        numPage: 1,
        fileURL: 'http://localhost:3000',
        fileSize: 1024,
        fileCoin: 200,
        numOfCopies: 1
      },
      {
        fileId: '3',
        fileName: 'filename.csv',
        numPage: 1,
        fileURL: 'http://localhost:3000',
        fileSize: 1024,
        fileCoin: 200,
        numOfCopies: 1
      },
      {
        fileId: '4',
        fileName: 'filename.csv',
        numPage: 1,
        fileURL: 'http://localhost:3000',
        fileSize: 1024,
        fileCoin: 200,
        numOfCopies: 1
      }
    ],
    []
  );

  const fileTable = useReactTable<FileExtraMetadata>({
    columns: columnDefs,
    data: defaultData,
    getCoreRowModel: getCoreRowModel<RowModel<FileExtraMetadata>>()
  });

  const BUTTON_CLASSNAME =
    'h-[64px] px-8 py-2 text-xl font-bold text-white rounded-none hover:shadow-none shadow-none rounded-b-lg';
  return (
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
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col bg-white'>
          <div className='flex px-6 py-4'>
            <MapPinIcon className='w-6 h-6 text-blue/1' />
            <span className='ml-2 text-base font-medium text-gray/4'>Pick-up location</span>
          </div>
          <div className='px-6 pb-4 flex justify-between'>
            <p className='text-base font-normal text-gray/4'>Tiệm in thư viện H3, tầng 1</p>
            <QuestionMarkCircleIcon className='w-7 h-7 opacity-40 cursor-pointer focus:opacity-100 active:opacity-100' />
          </div>
        </div>
        <div className='flex flex-col bg-white'>
          <div className='flex px-6 py-4'>
            <WalletIcon className='w-6 h-6 text-blue/1' />
            <span className='ml-2 text-base font-medium text-gray/4'>Payment method</span>
          </div>
          <div className='px-6 pb-4'>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center'>
                <span className='text-base font-medium text-gray/4'>Print wallet</span>
                <ChevronRightIcon className='w-7 h-7 opacity-40 focus:opacity-100 active:opacity-100 cursor-pointer' />
              </div>
              <div className='flex'>
                <span className='text-base font-medium text-gray/4'>Current balance:</span>
                <img src={coinImage} alt='Coin Icon' className='w-6 h-6 mr-1' />
                <span className='text-base font-bold text-[#D97706]'>{User_Balance}</span>
              </div>
              <div
                className={
                  User_Balance >= FEE.reduce((total, item) => total + item.price, 0)
                    ? 'hidden'
                    : 'flex flex-col mt-3 bg-red-100 rounded-sm p-3'
                }
              >
                <div className='flex'>
                  <ExclamationCircleIcon className='w-6 h-6 text-red-600 mr-3' />
                  <span className='text-base font-bold text-red-600'>Amount exceed balance!</span>
                </div>
                <div className='text-base font-normal text-red-600'>
                  Top up your account to proceed.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col bg-white rounded-b-lg'>
          <div className='flex px-6 py-4'>
            <ClipboardDocumentListIcon className='w-6 h-6 text-blue/1 mr-3' />
            <span className='text-base font-medium text-gray/4'>Charge Details</span>
          </div>
          <div className='px-6 pb-6'>
            {FEE.map((item, index) => (
              <div key={index} className='flex justify-between'>
                <span className='text-base font-normal text-gray/4'>{item.name}</span>
                <div className='flex'>
                  <img
                    src={coinImage}
                    alt='Coin Icon'
                    className='w-6 h-6 mr-1 mix-blend-luminosity opacity-50;'
                  />
                  <span className='text-base font-normal text-gray/4'>{item.price}</span>
                </div>
              </div>
            ))}
            <div className='flex justify-between mt-3'>
              <span className='text-base font-medium text-gray/4'>Total cost</span>
              <div className='flex'>
                <img src={coinImage} alt='Coin Icon' className='w-6 h-6 mr-1' />
                <span className='text-base font-bold text-[#D97706]'>{totalCost}</span>
              </div>
            </div>
          </div>
          <Button
            fullWidth
            className={
              User_Balance >= FEE.reduce((total, item) => total + item.price, 0)
                ? BUTTON_CLASSNAME + ' bg-blue/1'
                : BUTTON_CLASSNAME + ' bg-gray/2 pointer-events-none'
            }
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
}
