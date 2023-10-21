import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import {
  UploadDocumentForm,
  OrderListForm,
  ConfirmOrderForm,
  TopupWalletForm,
  OrderSuccessForm,
  PreviewDocument
} from '@components/order';
import { HomePage } from '@pages';
import { useOrderWorkflowStore } from '@states/order';

export function useOrderWorkflowBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow = () => {
    const { orderStep } = useOrderWorkflowStore();
    if (orderStep === 0) {
      return <HomePage />;
    } else if (orderStep === 1) {
      return <UploadDocumentForm />;
    } else if (orderStep === 2) {
      return <OrderListForm />;
    } else if (orderStep === 3) {
      return <ConfirmOrderForm />;
    } else if (orderStep === 4) {
      return <TopupWalletForm />;
    } else if (orderStep === 5) {
      return <OrderSuccessForm />;
    } else if (orderStep === 6) {
      return <PreviewDocument />;
    }
  };

  const OrderWorkflow = () => {
    const handleOpenDialog = () => setOpenDialog(!openDialog);
    return (
      <Dialog open={openDialog} handler={handleOpenDialog} size='xxl'>
        <DialogBody className='p-0 bg-gray/1'>
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
