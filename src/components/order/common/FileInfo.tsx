import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { EyeIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { FILE_CONFIG } from '@constants';
import { usePrintingRequestMutation, emitEvent } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export const FileInfo: Component<{
  fileExtraMetadata: FileExtraMetadata;
  isConfigStep: boolean;
  fileIndex?: number;
  initialTotalCost?: MutableRefObject<number>;
  updateAmountFiles?: (listFileAmount: FileAmount[]) => Promise<unknown>;
}> = ({ fileExtraMetadata, isConfigStep, fileIndex, initialTotalCost, updateAmountFiles }) => {
  const queryClient = useQueryClient();
  const { deleteFile } = usePrintingRequestMutation();

  const {
    totalCost,
    listFileAmount,
    isOrderUpdate,
    setFileConfig,
    setTotalCost,
    setListFileAmount,
    clearFileConfig,
    clearSpecificPageAndPageBothSide
  } = useOrderPrintStore();
  const { mobileOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (fileIndex !== undefined && listFileAmount[fileIndex] === undefined && isOrderUpdate) {
      setListFileAmount({
        fileId: fileExtraMetadata.fileId,
        numOfCopies: fileExtraMetadata.numOfCopies
      });
    }
  }, [
    fileExtraMetadata.fileId,
    fileExtraMetadata.numOfCopies,
    fileIndex,
    isOrderUpdate,
    listFileAmount,
    setListFileAmount
  ]);

  const handleOpenDialog = useCallback(() => setOpenDialog(!openDialog), [openDialog]);
  const handleDecreaseCopies = () => {
    if (isConfigStep) {
      if (fileExtraMetadata.numOfCopies > 1) {
        setFileConfig(FILE_CONFIG.numOfCopies, fileExtraMetadata.numOfCopies - 1);
        setTotalCost(totalCost - fileExtraMetadata.fileCoin);
      }
    } else if (fileIndex !== undefined) {
      if ((listFileAmount[fileIndex]?.numOfCopies ?? 0) > 1) {
        setListFileAmount({
          fileId: fileExtraMetadata.fileId,
          numOfCopies: (listFileAmount[fileIndex]?.numOfCopies ?? 0) - 1
        });
        setTotalCost(totalCost - fileExtraMetadata.fileCoin);
        if (initialTotalCost) {
          initialTotalCost.current -= fileExtraMetadata.fileCoin;
        }
      }
    }
  };
  const handleIncreaseCopies = () => {
    if (isConfigStep) {
      setFileConfig(FILE_CONFIG.numOfCopies, fileExtraMetadata.numOfCopies + 1);
    } else if (fileIndex !== undefined) {
      setListFileAmount({
        fileId: fileExtraMetadata.fileId,
        numOfCopies: (listFileAmount[fileIndex]?.numOfCopies ?? 0) + 1
      });
    }
    setTotalCost(totalCost + fileExtraMetadata.fileCoin);
    if (initialTotalCost) {
      initialTotalCost.current += fileExtraMetadata.fileCoin;
    }
  };

  const handleDeleteFile = useCallback(async () => {
    if (
      !isConfigStep &&
      fileIndex !== undefined &&
      listFileAmount[fileIndex] !== undefined &&
      initialTotalCost &&
      updateAmountFiles
    ) {
      await updateAmountFiles(listFileAmount);
      await deleteFile.mutateAsync(fileExtraMetadata.fileId);
      setTotalCost(
        totalCost - fileExtraMetadata.fileCoin * (listFileAmount[fileIndex]?.numOfCopies ?? 0)
      );
      initialTotalCost.current -=
        fileExtraMetadata.fileCoin * (listFileAmount[fileIndex]?.numOfCopies ?? 0);
      emitEvent('listFiles:refetch');
    } else {
      await deleteFile.mutateAsync(fileExtraMetadata.fileId);
      setTotalCost(totalCost - fileExtraMetadata.fileCoin * fileExtraMetadata.numOfCopies);
      clearFileConfig();
      clearSpecificPageAndPageBothSide();
    }
    handleOpenDialog();
  }, [
    fileExtraMetadata.fileCoin,
    fileExtraMetadata.fileId,
    fileExtraMetadata.numOfCopies,
    fileIndex,
    initialTotalCost,
    isConfigStep,
    listFileAmount,
    totalCost,
    deleteFile,
    setTotalCost,
    handleOpenDialog,
    clearFileConfig,
    clearSpecificPageAndPageBothSide,
    updateAmountFiles
  ]);

  return (
    <>
      <div className='flex gap-4 px-4 py-2 bg-white '>
        <div
          className='md:hidden text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer'
          onClick={() => {
            if (!isConfigStep) {
              queryClient.setQueryData(['fileURL'], fileExtraMetadata.fileURL);
            }
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
              <img src={coinImage} className='grayscale w-6 h-6' />
              <span className='text-gray/4 font-normal'>
                {fileExtraMetadata.fileCoin +
                  ' x ' +
                  (fileIndex === undefined
                    ? fileExtraMetadata.numOfCopies
                    : listFileAmount[fileIndex]?.numOfCopies) +
                  ' copies = '}
              </span>
              <img src={coinImage} className='w-6 h-6' />
              <span className='text-yellow/1 font-bold'>
                {fileExtraMetadata.fileCoin *
                  (fileIndex === undefined
                    ? fileExtraMetadata.numOfCopies
                    : listFileAmount[fileIndex]?.numOfCopies ?? 0)}
              </span>
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex border-2 '>
              <span
                className='p-0.5 border-r-2 flex items-center cursor-pointer'
                onClick={handleDecreaseCopies}
              >
                <MinusIcon width={20} />
              </span>
              <span className='py-0.5 px-6'>
                {fileIndex === undefined
                  ? fileExtraMetadata.numOfCopies
                  : listFileAmount[fileIndex]?.numOfCopies}
              </span>
              <span
                className='p-0.5 border-l-2 flex items-center cursor-pointer'
                onClick={handleIncreaseCopies}
              >
                <PlusIcon width={20} />
              </span>
            </div>
            <TrashIcon
              strokeWidth={2}
              className='w-10 h-10 cursor-pointer text-red-500 hover:bg-red-50 rounded-full p-2'
              onClick={handleOpenDialog}
            />
          </div>
        </div>
      </div>
      <Dialog size='xs' open={openDialog} handler={handleOpenDialog}>
        <DialogHeader className='justify-end'>
          <IconButton color='blue-gray' size='sm' variant='text' onClick={handleOpenDialog}>
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
            <Button className='bg-red-400' onClick={handleDeleteFile}>
              Đồng ý
            </Button>
            <Button onClick={handleOpenDialog}>Không</Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
