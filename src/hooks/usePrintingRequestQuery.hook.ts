import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
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

  const coinPerPage = useQuery({
    queryKey: ['/api/configuration/coinPerPage'],
    queryFn: () => configurationService.getCoinPerPage(),
    retry: retryQueryFn
  });

  const VNDPerCoin = useQuery({
    queryKey: ['/api/configuration/VNDPerCoin'],
    queryFn: () => configurationService.getVNDPerCoin(),
    retry: retryQueryFn
  });

  const bonusCoin = useQuery({
    queryKey: ['/api/configuration/bonusCoinPer100000Vnd'],
    queryFn: () => configurationService.getBonusCoin(),
    retry: retryQueryFn
  });

  const serviceFee = useQuery({
    queryKey: ['/api/configuration/serviceFee'],
    queryFn: () => configurationService.getServiceFee(),
    retry: retryQueryFn
  });

  const fileUploadRequirement = useQueries({
    queries: [
      {
        queryKey: ['/api/configuration/acceptedExtension'],
        queryFn: () => configurationService.getAcceptedFileExtension()
      },
      {
        queryKey: ['/api/configuration/maxFileSize'],
        queryFn: () => configurationService.getMaxFileSize()
      }
    ]
  });

  return {
    listFiles: listFiles,
    coinPerPage: coinPerPage,
    VNDPerCoin: VNDPerCoin,
    bonusCoin: bonusCoin,
    serviceFee: serviceFee,
    fileUploadRequirement: fileUploadRequirement
  };
}
