import { useCallback, useEffect, useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogBody } from '@material-tailwind/react';
import {
  UploadDocumentForm,
  OrderListForm,
  ConfirmOrderForm,
  TopupWalletForm,
  OrderSuccessForm,
  PreviewDocument
} from '@components/order/mobile';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states';

export function useOrderWorkflowBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow = () => {
    const queryClient = useQueryClient();
    const fileIdCurrent = queryClient.getQueryData<string>(['fileIdCurrent']);
    const { data: fileMetadata } = useQuery({
      queryKey: ['fileMetadata', fileIdCurrent],
      queryFn: () => queryClient.getQueryData<FileMetadata>(['fileMetadata', fileIdCurrent])
    });

    const { totalCost, setTotalCost } = useOrderPrintStore();
    const { mobileOrderStep } = useOrderWorkflowStore();
    const initialTotalCost = useRef<number>(totalCost);

    const handleExistOrderForm = useCallback(() => {
      setOpenDialog(false);
    }, []);

    useEffect(() => {
      if (fileMetadata?.fileCoin) {
        setTotalCost(initialTotalCost.current + fileMetadata?.fileCoin);
      }
    }, [fileMetadata?.fileCoin, setTotalCost]);

    if (mobileOrderStep.current === 0) {
      return (
        <UploadDocumentForm
          handleExistOrderForm={handleExistOrderForm}
          initialTotalCost={initialTotalCost}
        />
      );
    } else if (mobileOrderStep.current === 1) {
      return <PreviewDocument />;
    } else if (mobileOrderStep.current === 2) {
      return (
        <OrderListForm
          handleExistOrderForm={handleExistOrderForm}
          initialTotalCost={initialTotalCost}
        />
      );
    } else if (mobileOrderStep.current === 3) {
      return <ConfirmOrderForm />;
    } else if (mobileOrderStep.current === 4) {
      return <TopupWalletForm />;
    } else if (mobileOrderStep.current === 5) {
      return <OrderSuccessForm />;
    }
  };

  const OrderWorkflowBox = () => {
    return (
      <Dialog open={openDialog} handler={() => setOpenDialog(false)} size='xxl'>
        <DialogBody className='p-0 bg-gray/1'>
          <DialogBodyWorkflow />
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openOrderWorkflowBox: () => setOpenDialog(true),
    closeOrderWorkflowBox: () => setOpenDialog(false),
    OrderWorkflowBox: OrderWorkflowBox
  };
}
