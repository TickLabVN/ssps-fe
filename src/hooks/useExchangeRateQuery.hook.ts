import { useQueries } from '@tanstack/react-query';
import { configurationService } from '@services';

export function useExchangeRateQuery() {
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

  return {
    exchangeRate: exchangeRate
  };
}
