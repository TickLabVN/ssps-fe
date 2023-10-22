import { useMemo, useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import coinImage from '@assets/coin.png';
import { useFileStore } from '@states/home';
import { formatFileSize } from '@utils';

export function useUploadAndPreviewDocBox() {
  const { fileTarget } = useFileStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const [coins, setCoins] = useState<number>(1);
  //const [numOfCopy, setNumOfCopy] = useState<number>()

  const UploadAndPreviewDocBox = useMemo(
    () => () => {
      const handleOpenDialog = () => setOpenDialog(!openDialog);
      return (
        <Dialog size='xl' open={openDialog} handler={handleOpenDialog}>
          <DialogBody className='grid grid-cols-3'>
            <div className='flex flex-col p-12'>
              <span className='text-gray/4 text-2xl font-bold'>Upload document</span>
              <p className='flex items-center gap-2 font-medium text-xl'>
                <span className='text-gray/4'>{fileTarget.name}</span>
                <span className='text-gray/3'>{`(${formatFileSize(fileTarget.size)})`}</span>
              </p>
              <p className='flex'>
                <img src={coinImage} className='grayscale w-[16px]' />
                {/* <span>{coins}</span> */}
                <span className='mx-2'>x</span>
                {/* <span>{`${currentNumber}`}</span> */}
              </p>
            </div>
            <div>B</div>
          </DialogBody>
        </Dialog>
      );
    },
    [openDialog, fileTarget.name, fileTarget.size]
  );

  return {
    openUploadAndPreviewDocBox: () => setOpenDialog(true),
    UploadAndPreviewDocBox: UploadAndPreviewDocBox
  };
}
