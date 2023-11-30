import { MutableRefObject, useCallback, useEffect, useState } from 'react';
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
import { UploadAndPreviewDesktop } from '@components/order/desktop';
import { ScreenSize } from '@constants';
import { usePrintingRequestMutation, useScreenSize } from '@hooks';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states';

export function useOrderWorkflow() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyWorkflow: Component<{ initialTotalCost: MutableRefObject<number> }> = ({
    initialTotalCost
  }) => {
    const { screenSize } = useScreenSize();

    const queryClient = useQueryClient();
    const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);
    const fileIdCurrent = queryClient.getQueryData<string>(['fileIdCurrent']);
    const { data: fileMetadata } = useQuery({
      queryKey: ['fileMetadata', fileIdCurrent],
      queryFn: () => queryClient.getQueryData<FileMetadata>(['fileMetadata', fileIdCurrent])
    });
    const { cancelPrintingRequest } = usePrintingRequestMutation();

    const { setTotalCost } = useOrderPrintStore();
    const { mobileOrderStep, desktopOrderStep } = useOrderWorkflowStore();

    useEffect(() => {
      if (fileMetadata?.fileId) {
        setTotalCost(initialTotalCost.current + fileMetadata?.fileCoin);
      }
    }, [fileMetadata?.fileId, fileMetadata?.fileCoin, initialTotalCost, setTotalCost]);

    const handleExistOrderForm = useCallback(async () => {
      if (!printingRequestId) return;
      await cancelPrintingRequest.mutateAsync(printingRequestId.id);
      setOpenDialog(false);
    }, [printingRequestId, cancelPrintingRequest]);

    if (screenSize <= ScreenSize.MD) {
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
    } else {
      if (desktopOrderStep === 0) {
        return (
          <UploadAndPreviewDesktop
            initialTotalCost={initialTotalCost}
            handleCloseUploadForm={() => setOpenDialog(false)}
          />
        );
      }
    }
  };

  const OrderWorkflow: Component<{ initialTotalCost: MutableRefObject<number> }> = ({
    initialTotalCost
  }) => {
    const { screenSize } = useScreenSize();
    return (
      <Dialog
        size={screenSize <= ScreenSize.MD ? 'xxl' : 'xl'}
        open={openDialog}
        handler={() => setOpenDialog(false)}
        dismiss={{
          escapeKey: false,
          outsidePress: false
        }}
      >
        <DialogBody className='p-0.5 bg-gray/1 rounded-md'>
          <DialogBodyWorkflow initialTotalCost={initialTotalCost} />
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openOrderWorkflow: () => setOpenDialog(true),
    closeOrderWorkflow: () => setOpenDialog(false),
    OrderWorkflow: OrderWorkflow
  };
}
