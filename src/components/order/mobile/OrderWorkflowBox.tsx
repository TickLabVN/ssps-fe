import { useCallback, useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import {
  UploadDocumentForm,
  OrderListForm,
  ConfirmOrderForm,
  TopupWalletForm,
  OrderSuccessForm,
  PreviewDocument
} from '@components/order/mobile';
import { useOrderWorkflowStore } from '@states';

export function useOrderWorkflowBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow = () => {
    const { mobileOrderStep } = useOrderWorkflowStore();
    const handleExistOrderForm = useCallback(() => {
      setOpenDialog(false);
    }, []);

    if (mobileOrderStep === 1) {
      return <UploadDocumentForm handleExistOrderForm={handleExistOrderForm} />;
    } else if (mobileOrderStep === 2) {
      return <OrderListForm />;
    } else if (mobileOrderStep === 3) {
      return <ConfirmOrderForm />;
    } else if (mobileOrderStep === 4) {
      return <TopupWalletForm />;
    } else if (mobileOrderStep === 5) {
      return <OrderSuccessForm />;
    } else if (mobileOrderStep === 6) {
      return <PreviewDocument />;
    }
  };

  const OrderWorkflowBox = () => {
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
    OrderWorkflowBox: OrderWorkflowBox
  };
}
