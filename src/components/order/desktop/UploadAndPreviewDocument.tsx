import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';

export function UploadAndPreviewDocument() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);

  return (
    <Dialog size='xs' open={openDialog} handler={handleOpenDialog}>
      <DialogBody className='grid grid-cols-3'></DialogBody>
    </Dialog>
  );
}
