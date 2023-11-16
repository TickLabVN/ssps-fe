import { useQuery } from '@tanstack/react-query';
import { homeService } from '@services';
import { retryQueryFn } from '@utils';

export function useUserCoinsQuery() {
  return useQuery({
    queryKey: ['/api/user/remain-coins'],
    queryFn: () => homeService.getRemainCoins(),
    retry: retryQueryFn,
    staleTime: 300000
  });
}
