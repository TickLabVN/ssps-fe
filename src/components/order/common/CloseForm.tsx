import { useMemo, useState } from 'react';
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
    handleExist: () => void;
  }> = ({ handleSave, handleExist }) =>
    useMemo(() => {
      const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
      };

      return (
        <Dialog open={openDialog} handler={handleOpenDialog} size='xs'>
          <DialogHeader className='justify-end py-2'>
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
          <DialogBody className='px-[50px] py-2 text-center'>
            <Typography variant='h4' color='black'>
              Do you want to save your changes?
            </Typography>
            <Typography variant='h6'>Your changes will be lost if you don't save them</Typography>
            <div className='flex items-center justify-center gap-5 mt-4'>
              <Button className='bg-green-500' onClick={handleSave}>
                Save changes
              </Button>
              <Button onClick={handleExist}>Don't save</Button>
            </div>
          </DialogBody>
        </Dialog>
      );
    }, [handleSave, handleExist]);

  return {
    openCloseForm: () => setOpenDialog(true),
    CloseForm: CloseForm
  };
}
