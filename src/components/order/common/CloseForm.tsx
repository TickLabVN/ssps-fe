import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography
} from '@material-tailwind/react';

export function useCloseForm() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const CloseForm: Component<{
    handleSave: () => Promise<void> | void;
    handleExist: () => Promise<void> | void;
    listFilesLength?: number;
  }> = ({ handleSave, handleExist, listFilesLength }) => {
    return (
      <Dialog open={openDialog} handler={() => setOpenDialog(false)} size='xs'>
        <DialogHeader className='justify-end py-2'>
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
        <DialogBody className='px-[25px] py-2 text-center'>
          <Typography variant='h5' color='black'>
            Bạn có muốn tiếp tục đặt hàng?
          </Typography>
          {listFilesLength === 0 && (
            <Typography variant='h6'>
              Hiện tại không có file nào trong đơn đặt hàng, bạn không thể tiếp tục.
            </Typography>
          )}
          <div className='flex items-center justify-center gap-5 mt-4'>
            {listFilesLength !== undefined ? (
              <Button
                color={listFilesLength > 0 ? 'green' : 'gray'}
                onClick={() => {
                  setOpenDialog(false);
                  handleSave();
                }}
                disabled={listFilesLength === 0}
              >
                Tiếp tục
              </Button>
            ) : (
              <Button
                color='green'
                onClick={() => {
                  setOpenDialog(false);
                  handleSave();
                }}
              >
                Tiếp tục
              </Button>
            )}
            <Button
              onClick={() => {
                setOpenDialog(false);
                handleExist();
              }}
            >
              Không
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openCloseForm: () => setOpenDialog(true),
    CloseForm: CloseForm
  };
}
