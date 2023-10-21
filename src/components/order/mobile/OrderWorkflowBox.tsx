import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import {
  UploadDocumentForm,
  OrderListForm,
  ConfirmOrderForm,
  TopupWalletForm,
  OrderSuccessForm,
  PreviewDocument
} from '@components/order/mobile';
//import { ScreenSize } from '@constants';
//import { useScreenSize } from '@hooks';
import { HomePage } from '@pages';
import { useOrderWorkflowStore } from '@states/order';

export function useOrderWorkflowBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow = () => {
    //const { screenSize } = useScreenSize();
    const { mobileOrderStep } = useOrderWorkflowStore();

    if (mobileOrderStep === 0) {
      return <HomePage />;
    } else if (mobileOrderStep === 1) {
      return <UploadDocumentForm />;
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
