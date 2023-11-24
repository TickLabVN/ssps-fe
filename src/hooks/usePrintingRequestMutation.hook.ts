import { useMutation, useQueryClient } from '@tanstack/react-query';
import { printingRequestService } from '@services';

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
      queryClient.setQueryData(['fileMetadata', data.fileId], null);
    }
  });

  const updateAmountFiles = useMutation({
    mutationKey: ['updateAmountFile'],
    mutationFn: (payload: FileAmount[]) => printingRequestService.updateAmountFiles(payload)
  });

  const cancelPrintingRequest = useMutation({
    mutationKey: ['cancelPrintingRequest'],
    mutationFn: (printingRequestId: string) =>
      printingRequestService.cancelPrintingRequest(printingRequestId)
  });

  return {
    createPrintingRequest: createPrintingRequest,
    uploadFile: uploadFile,
    uploadFileConfig: uploadFileConfig,
    deleteFile: deleteFile,
    updateAmountFiles: updateAmountFiles,
    cancelPrintingRequest: cancelPrintingRequest
  };
}
