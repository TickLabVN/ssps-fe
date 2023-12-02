import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography
} from '@material-tailwind/react';
import { TrashIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { EyeIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { FileBox } from '@components/order/common';
import { usePrintingRequestMutation, usePrintingRequestQuery, useListenEvent } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';
import { usePreviewDocumentDesktop } from './PreviewDocumentDesktop';

export const OrderListDesktop: Component<{ initialTotalCost: MutableRefObject<number> }> = ({
  initialTotalCost
}) => {
  const queryClient = useQueryClient();
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);
  const { updateAmountFile, deleteFile, cancelPrintingRequest } = usePrintingRequestMutation();
  const {
    listFiles: { data: listFiles, isFetching, isError, refetch: refetchListFiles }
  } = usePrintingRequestQuery();

  const { openPreviewDocumentDesktop, PreviewDocumentDesktop } = usePreviewDocumentDesktop();

  const { totalCost, setIsOrderUpdate, setIsFileUploadSuccess, setTotalCost } =
    useOrderPrintStore();
  const { setDesktopOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [fileDeletedParams, setFileDeletedParams] = useState<{
    fileId: string;
    fileCoin: number;
    numOfCopies: number;
  }>({
    fileId: '',
    fileCoin: -1,
    numOfCopies: -1
  });

  useEffect(() => {
    setTotalCost(initialTotalCost.current);
  }, [initialTotalCost, setTotalCost]);

  const handleSaveOrderUpdate = () => {
    initialTotalCost.current = totalCost;
    setIsOrderUpdate(false);
    setDesktopOrderStep(2);
    setMobileOrderStep({
      current: 3,
      prev: 2
    });
  };

  const handleExistOrderUpdate = async () => {
    initialTotalCost.current = 0;
    setTotalCost(0);
    setIsFileUploadSuccess(false);
    setIsOrderUpdate(false);
    setDesktopOrderStep(0);
    if (printingRequestId?.id) {
      await cancelPrintingRequest.mutateAsync(printingRequestId?.id);
    }
  };

  const handleDeleteFile = async (fileId: string, fileCoin: number, numOfCopies: number) => {
    await deleteFile.mutateAsync(fileId);
    setTotalCost(totalCost - fileCoin * numOfCopies);
    initialTotalCost.current -= fileCoin * numOfCopies;
    await refetchListFiles();
    setOpenDialog(false);
  };

  const handleDecreaseCopies = useCallback(
    async (fileId: string, fileCoin: number, numOfCopies: number) => {
      if (numOfCopies > 1) {
        await updateAmountFile.mutateAsync({
          fileId: fileId,
          numOfCopies: numOfCopies - 1
        });
        setTotalCost(totalCost - fileCoin);
        if (initialTotalCost) {
          initialTotalCost.current -= fileCoin;
        }
        await refetchListFiles();
      }
    },
    [initialTotalCost, totalCost, updateAmountFile, setTotalCost, refetchListFiles]
  );

  const handleIncreaseCopies = useCallback(
    async (fileId: string, fileCoin: number, numOfCopies: number) => {
      await updateAmountFile.mutateAsync({
        fileId: fileId,
        numOfCopies: numOfCopies + 1
      });
      setTotalCost(totalCost + fileCoin);
      if (initialTotalCost) {
        initialTotalCost.current += fileCoin;
      }
      await refetchListFiles();
    },
    [initialTotalCost, totalCost, updateAmountFile, setTotalCost, refetchListFiles]
  );

  useListenEvent('appNavigation:save', handleSaveOrderUpdate);
  useListenEvent('appNavigation:exist', handleExistOrderUpdate);

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
                  <img src={coinImage} className='grayscale w-6 h-6' />
                  <span className='text-gray/4 font-normal'>{info.row.original.fileCoin}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('numOfCopies', {
        header: 'SỐ LƯỢNG',
        cell: (info) => (
          <div className='flex justify-center'>
            <div className='flex border-2 w-fit'>
              <span
                className='p-0.5 border-r-2 flex items-center cursor-pointer'
                onClick={() =>
                  handleDecreaseCopies(
                    info.row.original.fileId,
                    info.row.original.fileCoin,
                    info.row.original.numOfCopies
                  )
                }
              >
                <MinusIcon width={20} />
              </span>
              <span className='py-0.5 px-6'>{info.row.original.numOfCopies}</span>
              <span
                className='p-0.5 border-l-2 flex items-center cursor-pointer'
                onClick={() =>
                  handleIncreaseCopies(
                    info.row.original.fileId,
                    info.row.original.fileCoin,
                    info.row.original.numOfCopies
                  )
                }
              >
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
            <span className='text-yellow/1 font-bold text-xl'>
              {info.row.original.fileCoin * info.row.original.numOfCopies}
            </span>
          </div>
        )
      }),
      columnHelper.display({
        id: 'removeFile',
        cell: (info) => (
          <TrashIcon
            strokeWidth={2}
            className='w-10 h-10 cursor-pointer text-red-500 hover:bg-red-50 rounded-full p-2'
            onClick={() => {
              setFileDeletedParams({
                fileId: info.row.original.fileId,
                fileCoin: info.row.original.fileCoin,
                numOfCopies: info.row.original.numOfCopies
              });
              setOpenDialog(true);
            }}
          />
        )
      })
    ],
    [
      columnHelper,
      queryClient,
      handleDecreaseCopies,
      handleIncreaseCopies,
      openPreviewDocumentDesktop
    ]
  );

  const fileTable = useReactTable<FileExtraMetadata>({
    columns: columnDefs,
    data: listFiles ?? [],
    getCoreRowModel: getCoreRowModel<RowModel<FileExtraMetadata>>()
  });

  return (
    <>
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
                  fileTable.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getAllCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : isError ? (
                  <tr>
                    <td colSpan={fileTable.getLeafHeaders().length}>
                      <div className='grid justify-items-center items-center'>
                        <Typography variant='h6' color='red'>
                          Không thể tải danh sách các file trong đơn hàng.
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
                <tr>
                  <td colSpan={fileTable.getLeafHeaders().length}>
                    <div className='grid justify-items-center items-center'>
                      <Typography variant='h6'>
                        Hiện tại không có file nào trong đơn hàng.
                      </Typography>
                    </div>
                  </td>
                </tr>
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
                {totalCost}
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
                {totalCost}
              </div>
            </div>
          </div>
          <Button
            className='uppercase font-bold text-white text-xl bg-blue/1 w-full rounded-t-none'
            color={listFiles && listFiles.length > 0 ? 'blue' : 'gray'}
            onClick={handleSaveOrderUpdate}
            disabled={!listFiles || listFiles.length === 0}
          >
            order
          </Button>
        </div>
      </div>
      <Dialog size='xs' open={openDialog} handler={() => setOpenDialog(false)}>
        <DialogHeader className='justify-end'>
          <IconButton
            color='blue-gray'
            size='sm'
            variant='text'
            onClick={() => setOpenDialog(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className='pt-0 pb-6 flex flex-col items-center'>
          <Typography variant='h6'>Bạn có đồng ý xóa file này ra khỏi đơn đặt hàng ?</Typography>
          <div className='mt-5 flex gap-5'>
            <Button
              className='bg-red-400'
              onClick={() =>
                handleDeleteFile(
                  fileDeletedParams.fileId,
                  fileDeletedParams.fileCoin,
                  fileDeletedParams.numOfCopies
                )
              }
            >
              Đồng ý
            </Button>
            <Button onClick={() => setOpenDialog(false)}>Không</Button>
          </div>
        </DialogBody>
      </Dialog>
      {<PreviewDocumentDesktop />}
    </>
  );
};
