import { useMutation } from '@tanstack/react-query';
import { orderPrintService } from '@services';
import { useOrderPrintStore } from '@states';

export function usePrintMutation() {
  const { updatePrintingRequestId } = useOrderPrintStore();

  return useMutation({
    mutationKey: ['createPrintingRequest'],
    mutationFn: () => orderPrintService.createPrintingRequest(),
    onSuccess: (data) => {
      updatePrintingRequestId(data);
    }
  });
}
