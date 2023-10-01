import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { UploadDocumentBox, OrderListBox } from '@components/order';
import { useOrderWorkflowStore } from '@states/order';

export function useOrderWorkflow() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow = () => {
    const { orderStep } = useOrderWorkflowStore();
    if (orderStep === 1) {
      return <UploadDocumentBox />;
    } else if (orderStep === 2) {
      return <OrderListBox />;
    }
  };

  const OrderWorkflow = () => {
    const handleOpenDialog = () => setOpenDialog(!openDialog);
    return (
      <Dialog open={openDialog} handler={handleOpenDialog} size='xxl'>
        <DialogBody>
          <DialogBodyWorkflow />
        </DialogBody>
      </Dialog>
    );
  };

  return {
    handleOrderWorkflow: () => setOpenDialog(true),
    OrderWorkflow: OrderWorkflow
  };
}
