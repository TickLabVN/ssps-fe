import { useMutation, useQueryClient } from '@tanstack/react-query';
import { printingRequestService, buyCoinService, userService } from '@services';
import { retryQueryFn } from '@utils';

export function usePrintingRequestMutation() {
  const queryClient = useQueryClient();

  const createPrintingRequest = useMutation({
    mutationKey: ['createPrintingRequest'],
    mutationFn: () => printingRequestService.createPrintingRequest(),
    onSuccess: (data) => {
      queryClient.setQueryData(['printingRequestId'], data);
    }
  });

  const uploadFile = useMutation({
    mutationKey: ['uploadFile'],
    mutationFn: ({ printingRequestId, file }: { printingRequestId: string; file: File }) =>
      printingRequestService.uploadFile(printingRequestId, file),
    onSuccess: (data) => {
      queryClient.setQueryData(['fileIdCurrent'], data.fileId);
      queryClient.setQueryData(['fileURL'], data.fileURL);
      queryClient.setQueryData(['fileMetadata', data.fileId], data);
    }
  });

  const uploadFileConfig = useMutation({
    mutationKey: ['uploadFileConfig'],
    mutationFn: ({ fileId, fileConfig }: { fileId: string; fileConfig: FileConfig }) =>
      printingRequestService.uploadFileConfig(fileId, fileConfig)
  });

  const deleteFile = useMutation({
    mutationKey: ['deleteFile'],
    mutationFn: (fileId: string) => printingRequestService.deleteFile(fileId),
    onSuccess: (data) => {
      queryClient.setQueryData(['fileIdCurrent'], null);
      queryClient.setQueryData(['fileURL'], null);
      queryClient.setQueryData(['fileMetadata', data.fileId], null);
    }
  });

  const updateAmountFile = useMutation({
    mutationKey: ['updateAmountFile'],
    mutationFn: (payload: FileAmount) => printingRequestService.updateAmountFile(payload)
  });

  const cancelPrintingRequest = useMutation({
    mutationKey: ['cancelPrintingRequest'],
    mutationFn: (printingRequestId: string) =>
      printingRequestService.cancelPrintingRequest(printingRequestId)
  });

  const createPayPalOrder = useMutation({
    mutationKey: ['createPayPalOrder'],
    mutationFn: (dollar: number) =>
      buyCoinService.createPayPalOrder(dollar).then((order) => order.id),
    onSuccess: (data) => {
      queryClient.setQueryData(['paypalOrderId'], data);
    }
  });

  const approvePayPalOrder = useMutation({
    mutationKey: ['approvePayPalOrder'],
    mutationFn: (orderId: string) => buyCoinService.approvePayPalOrder(orderId),
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: ['/api/user/remain-coins'],
        queryFn: () => userService.getRemainCoins(),
        retry: retryQueryFn
      });
    }
  });

  return {
    createPrintingRequest: createPrintingRequest,
    uploadFile: uploadFile,
    uploadFileConfig: uploadFileConfig,
    deleteFile: deleteFile,
    updateAmountFile: updateAmountFile,
    cancelPrintingRequest: cancelPrintingRequest,
    createPayPalOrder: createPayPalOrder,
    approvePayPalOrder: approvePayPalOrder
  };
}
