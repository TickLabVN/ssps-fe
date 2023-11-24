import { useQuery } from '@tanstack/react-query';
import { userService } from '@services';
import { retryQueryFn } from '@utils';

export function useUserQuery() {
  const remainCoins = useQuery({
    queryKey: ['/api/user/remain-coins'],
    queryFn: () => userService.getRemainCoins(),
    retry: retryQueryFn
  });

  const info = useQuery({
    queryKey: ['/api/user'],
    queryFn: () => userService.getInfo(),
    retry(failureCount, error: ResponseError) {
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) return false;
      return failureCount < 0;
    },
    enabled: false
  });

  return {
    remainCoins: remainCoins,
    info: info
  };
}
