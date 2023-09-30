import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';

export function useUploadDocumentBox() {
  const [openBox, setOpenBox] = useState<boolean>(false);
  const handleOpenBox = () => setOpenBox(!openBox);

  const UploadDocumentBox = () => (
    <Dialog open={openBox} handler={handleOpenBox} size='xxl'>
      <DialogBody>A</DialogBody>
    </Dialog>
  );

  return {
    openUploadDocumentBox: () => setOpenBox(true),
    UploadDocumentBox: UploadDocumentBox
  };
}
