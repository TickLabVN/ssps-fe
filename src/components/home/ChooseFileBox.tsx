import { useMemo, useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { useUploadDocumentBox } from '@components/order';

// Loc's task in here.
// This hook is used in ./src/pages/HomePage.tsx.

export function useChooseFileBox() {
  const { openUploadDocumentBox, UploadDocumentBox } = useUploadDocumentBox();
  const [openBox, setOpenBox] = useState<boolean>(false);

  const ChooseFileBox = useMemo(
    () => () => {
      const handleOpenBox = () => setOpenBox(!openBox);
      return (
        <>
          <Dialog open={openBox} handler={handleOpenBox}>
            <DialogBody
              onClick={() => {
                setOpenBox(false);
                openUploadDocumentBox();
              }}
            >
              A
            </DialogBody>
          </Dialog>
          {<UploadDocumentBox />}
        </>
      );
    },
    [openBox, openUploadDocumentBox, UploadDocumentBox]
  );

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
