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
      queryClient.setQueryData(['fileMetadata'], data);
    }
  });

  const uploadFileConfig = useMutation({
    mutationKey: ['uploadFileConfig'],
    mutationFn: ({ fileId, fileConfig }: { fileId: string; fileConfig: FileConfig }) =>
      printingRequestService.uploadFileConfig(fileId, fileConfig)
  });

  return {
    createPrintingRequest: createPrintingRequest,
    uploadFile: uploadFile,
    uploadFileConfig: uploadFileConfig
  };
}
