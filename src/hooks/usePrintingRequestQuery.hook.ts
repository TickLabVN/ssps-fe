import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import { printingRequestService, configurationService } from '@services';
import { retryQueryFn } from '@utils';

export function usePrintingRequestQuery() {
  const queryClient = useQueryClient();
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);

  const listFiles = useQuery({
    queryKey: [
      '/api/printRequest/{printingRequestId}/files',
      printingRequestId,
      printingRequestId && printingRequestId.id
    ],
    queryFn: () =>
      printingRequestId
        ? printingRequestService.getListFilesByPrintingRequest(printingRequestId.id)
        : null,
    retry: retryQueryFn
  });

  const exchangeRate = useQueries({
    queries: [
      {
        queryKey: ['/api/configuration/coinPerPage'],
        queryFn: () => configurationService.getCoinPerPage()
      },
      {
        queryKey: ['/api/configuration/dollarToCoin'],
        queryFn: () => configurationService.getCoinPerDollar()
      }
    ]
  });

  const serviceFee = useQuery({
    queryKey: ['/api/configuration/serviceFee'],
    queryFn: () => configurationService.getServiceFee(),
    retry: retryQueryFn
  });

  return {
    listFiles: listFiles,
    exchangeRate: exchangeRate,
    serviceFee: serviceFee
  };
}
