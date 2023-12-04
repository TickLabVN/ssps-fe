import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, userService } from '@services';

export function useAuthMutation() {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: ['/api/user'],
        queryFn: () => userService.getInfo(),
        retry: 0
      });
    }
  });
  return {
    logout: logout
  };
}
