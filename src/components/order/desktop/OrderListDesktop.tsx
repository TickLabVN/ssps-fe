import { MutableRefObject, useCallback, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import { TrashIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { EyeIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { FileBox } from '@components/order/common';
import { usePrintingRequestMutation, usePrintingRequestQuery, useListenEvent } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export const OrderListDesktop: Component<{ initialTotalCost: MutableRefObject<number> }> = ({
  initialTotalCost
}) => {
  const { updateAmountFiles } = usePrintingRequestMutation();
  const {
    listFiles: { data: listFiles, isFetching, isError, refetch: refetchListFiles }
  } = usePrintingRequestQuery();

  const { totalCost, listFileAmount, clearListFileAmount, setIsOrderUpdate } = useOrderPrintStore();
  const { setDesktopOrderStep } = useOrderWorkflowStore();

  useListenEvent('listFiles:refetch', clearListFileAmount);
  useListenEvent('listFiles:refetch', refetchListFiles);

  const handleSaveOrderUpdate = useCallback(async () => {
    await updateAmountFiles.mutateAsync(listFileAmount);
    initialTotalCost.current = totalCost;
    setIsOrderUpdate(false);
    setDesktopOrderStep(2);
  }, [
    initialTotalCost,
    totalCost,
    listFileAmount,
    updateAmountFiles,
    setDesktopOrderStep,
    setIsOrderUpdate
  ]);

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
                  <img src={coinImage} className='grayscale w-6 h-6' />
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
        cell: (info) => (
          <div className='flex justify-center'>
            <div className='flex border-2 w-fit'>
              <span className='p-0.5 border-r-2 flex items-center cursor-pointer'>
                <MinusIcon width={20} />
              </span>
              <span className='py-0.5 px-6'>{info.getValue()}</span>
              <span className='p-0.5 border-l-2 flex items-center cursor-pointer'>
                <PlusIcon width={20} />
              </span>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('fileCoin', {
        header: 'THÀNH TIỀN',
        cell: (info) => (
          <div className='flex items-center gap-1 text-sm justify-center'>
            <img src={coinImage} className='w-6 h-6' />
            <span className='text-yellow/1 font-bold text-xl'>{info.getValue()}</span>
          </div>
        )
      }),
      columnHelper.display({
        id: 'removeFile',
        header: '',
        cell: () => (
          <TrashIcon
            strokeWidth={2}
            className='w-10 h-10 cursor-pointer text-red-500 hover:bg-red-50 rounded-full p-2'
          />
        )
      })
    ],
    [columnHelper]
  );

  const fileTable = useReactTable<FileExtraMetadata>({
    columns: columnDefs,
    data: listFiles ?? [],
    getCoreRowModel: getCoreRowModel<RowModel<FileExtraMetadata>>()
  });

  return (
    <div className='grid grid-cols-3 py-4 px-12 gap-6'>
      <div className='col-span-2'>
        <div className='p-4 bg-white mb-6 rounded-lg'>
          <FileBox />
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
            {listFiles && listFiles.length > 0 ? (
              isFetching ? (
                <tr>
                  <td colSpan={fileTable.getLeafHeaders().length}>
                    <div className='grid justify-items-center items-center'>
                      <Spinner color='green' className='h-12 w-12' />
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={fileTable.getLeafHeaders().length}>
                    <div className='grid justify-items-center items-center'>
                      <Typography variant='h6' color='red'>
                        Không thể tải danh sách các files trong đơn hàng.
                      </Typography>
                    </div>
                  </td>
                </tr>
              ) : (
                fileTable.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getAllCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )
            ) : (
              <div className='pt-12 px-4 pb-4'>
                <FileBox />
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <div className='px-5 py-3 bg-white rounded-t-lg'>
          <div className='flex gap-4 mb-6'>
            <ClipboardDocumentListIcon width={28} color='blue' />
            <p className='text-gray/4 text-base font-medium'>Charge Details</p>
          </div>
          <div className='flex justify-between'>
            <p className='text-gray/4 text-base font-normal'>Print fee</p>
            <div className='flex'>
              <img
                src={coinImage}
                alt='Coin Icon'
                className='w-6 h-6 mr-1 opacity-50 mix-blend-luminosity'
              />
              2400
            </div>
          </div>
          <div className='flex justify-between mb-3'>
            <p className='text-gray/4 text-base font-normal'>Service fee</p>
            <p className='text-gray/3 text-base font-normal'>Not yet estimate</p>
          </div>
          <div className='flex justify-between'>
            <span>Total Cost</span>
            <div className='flex'>
              <img src={coinImage} alt='Coin Icon' className='w-6 h-6 mr-1' />
              2400
            </div>
          </div>
        </div>
        <Button
          className='uppercase font-bold text-white text-xl bg-blue/1 w-full rounded-t-none'
          onClick={handleSaveOrderUpdate}
        >
          order
        </Button>
      </div>
    </div>
  );
};
