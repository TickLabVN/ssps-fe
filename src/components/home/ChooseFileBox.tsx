import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { useOrderWorkflow } from '@components/order';
import { useOrderWorkflowStore } from '@states/order';

// Loc's task in here.
// This hook is used in ./src/pages/HomePage.tsx.

export function useChooseFileBox() {
  const { handleOrderWorkflow, OrderWorkflow } = useOrderWorkflow();
  const [openBox, setOpenBox] = useState<boolean>(false);

  const ChooseFileBox = () => {
    const { setOrderStep } = useOrderWorkflowStore();
    const handleOpenBox = () => setOpenBox(!openBox);

    return (
      <>
        <Dialog open={openBox} handler={handleOpenBox}>
          <DialogBody
            onClick={() => {
              setOpenBox(false);
              handleOrderWorkflow();
              setOrderStep(1);
            }}
          >
            A
          </DialogBody>
        </Dialog>
        {<OrderWorkflow />}
      </>
    );
  };

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
