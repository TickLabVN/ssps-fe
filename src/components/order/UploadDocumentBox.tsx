import { useMemo, useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';

// Tan's task in here.

export function useUploadDocumentBox() {
  const [openBox, setOpenBox] = useState<boolean>(false);

  const UploadDocumentBox = useMemo(
    () => () => {
      const handleOpenBox = () => setOpenBox(!openBox);
      return (
        <Dialog open={openBox} handler={handleOpenBox} size='xxl'>
          <DialogBody>A</DialogBody>
        </Dialog>
      );
    },
    [openBox]
  );

  return {
    openUploadDocumentBox: () => setOpenBox(true),
    UploadDocumentBox: UploadDocumentBox
  };
}
