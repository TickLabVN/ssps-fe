import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { UploadDocumentForm, OrderListForm, ConfirmOrderForm } from '@components/order';
import { useOrderWorkflowStore } from '@states/order';

export function useOrderWorkflowBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow = () => {
    const { orderStep } = useOrderWorkflowStore();
    if (orderStep === 1) {
      return <UploadDocumentForm />;
    } else if (orderStep === 2) {
      return <OrderListForm />;
    } else if (orderStep === 3) {
      return <ConfirmOrderForm />;
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
    openOrderWorkflowBox: () => setOpenDialog(true),
    OrderWorkflowBox: OrderWorkflow
  };
}
