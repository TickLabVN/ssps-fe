import { Dialog, DialogBody } from '@material-tailwind/react';
import {
  UploadDocumentForm,
  OrderListForm,
  ConfirmOrderForm,
  TopupWalletForm,
  OrderSuccessForm,
  PreviewDocument
} from '@components/order/mobile';
import { HomePage } from '@pages';
import { useOrderWorkflowStore } from '@states/order';

export function OrderWorkflowBox() {
  const { openMobileOrderWorkflow, setOpenMobileOrderWorkflow } = useOrderWorkflowStore();

  const DialogBodyWorkflow = () => {
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

  return (
    <Dialog
      open={openMobileOrderWorkflow}
      handler={() => setOpenMobileOrderWorkflow(!openMobileOrderWorkflow)}
      size='xxl'
    >
      <DialogBody className='p-0 bg-gray/1'>
        <DialogBodyWorkflow />
      </DialogBody>
    </Dialog>
  );
}
