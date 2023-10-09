import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { useOrderWorkflowBox } from '@components/order';
import { useOrderWorkflowStore } from '@states/order';
import { FileBox } from '../order/FileBox';

// Loc's task in here.
// This hook is used in ./src/pages/HomePage.tsx.

export function useChooseFileBox() {
  const { openOrderWorkflowBox, OrderWorkflowBox } = useOrderWorkflowBox();
  const [openBox, setOpenBox] = useState<boolean>(false);

  const ChooseFileBox = () => {
    const { setOrderStep } = useOrderWorkflowStore();
    const handleOpenBox = () => setOpenBox(!openBox);

    return (
      <>
        <div className='relative'>
          <Dialog open={openBox} handler={handleOpenBox}>
            <DialogBody
              className='flex flex-col items-center justify-center gap-5 p-5 lg:p-10'
              onClick={() => {
                setOpenBox(false);
                openOrderWorkflowBox();
                setOrderStep(1);
              }}
            >
              {<FileBox />}
            </DialogBody>
          </Dialog>
          {<OrderWorkflowBox />}
        </div>
      </>
    );
  };

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
