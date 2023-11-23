import { useQuery, useQueryClient } from '@tanstack/react-query';
import { printingRequestService } from '@services';
import { retryQueryFn } from '@utils';

export function usePrintingRequestQuery() {
  const queryClient = useQueryClient();
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);

  const listFiles = useQuery({
    queryKey: [
      '/api/printRequest/{printingRequestId}/files',
      printingRequestId && printingRequestId.id
    ],
    queryFn: () =>
      printingRequestId
        ? printingRequestService.getListFilesByPrintingRequest(printingRequestId.id)
        : undefined,
    retry: retryQueryFn
  });

  return {
    listFiles: listFiles
  };
}
