import { useEffect, useState } from 'react';
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
import { usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export const FileInfo: Component<{
  fileExtraMetadata: FileMetadata & { numOfCopies: number };
  isConfigStep: boolean;
  fileIndex?: number;
}> = ({ fileExtraMetadata, isConfigStep, fileIndex }) => {
  const { totalCost, listFileAmount, setFileConfig, setTotalCost, setListFileAmount } =
    useOrderPrintStore();
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const { deleteFile } = usePrintingRequestMutation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    setListFileAmount({
      fileId: fileExtraMetadata.fileId,
      numOfCopies: fileExtraMetadata.numOfCopies
    });
  }, [fileExtraMetadata.fileId, fileExtraMetadata.numOfCopies, setListFileAmount]);

  const handleOpenDialog = () => setOpenDialog(!openDialog);
  const handleDecreaseCopies = () => {
    if (fileExtraMetadata.numOfCopies > 1) {
      if (isConfigStep) {
        setFileConfig(FILE_CONFIG.numOfCopies, fileExtraMetadata.numOfCopies - 1);
      } else if (fileIndex !== undefined) {
        setListFileAmount({
          fileId: fileExtraMetadata.fileId,
          numOfCopies: (listFileAmount[fileIndex]?.numOfCopies ?? 0) - 1
        });
      }
      setTotalCost(totalCost - fileExtraMetadata.fileCoin);
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
  };

  const handleDeleteFile = async () => {
    await deleteFile.mutateAsync(fileExtraMetadata.fileId);
    setTotalCost(totalCost - fileExtraMetadata.fileCoin * fileExtraMetadata.numOfCopies);
    handleOpenDialog();
  };

  return (
    <>
      <div className='flex gap-4 px-4 py-2 bg-white '>
        <div
          className='text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer'
          onClick={() => setMobileOrderStep(1)}
        >
          <EyeIcon width={20} />
          <span className='text-xs'>Preview</span>
        </div>
        <div className='w-full'>
          <div className='flex flex-col text-gray/4'>
            <div className='flex items-center gap-1 font-medium'>
              <p className='max-w-[256px] truncate text-gray/4'>{fileExtraMetadata.fileName}</p>
              <p className='text-gray/3'>{`(${formatFileSize(fileExtraMetadata.fileSize)})`}</p>
            </div>
            <p className='flex items-center gap-1 text-sm mb-5'>
              <img src={coinImage} className='grayscale w-6 h-6' />
              <span className='text-gray/4 font-normal'>
                {fileExtraMetadata.fileCoin +
                  ' x ' +
                  (fileIndex === undefined
                    ? fileExtraMetadata.numOfCopies
                    : listFileAmount[fileIndex]?.numOfCopies)}
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
          <div className='flex justify-between items-center '>
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
