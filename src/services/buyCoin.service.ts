import { apiClient, invoke } from './common';

export const buyCoinService = {
  createPayPalOrder: (dollar: number) =>
    invoke(
      apiClient.POST('/api/coin/paypal/creating', {
        body: { intent: 'CAPTURE', amount: dollar }
      })
    ),
  approvePayPalOrder: (orderId: string) =>
    invoke(
      apiClient.POST('/api/coin/paypal/completing', {
        body: { intent: 'CAPTURE', orderId: orderId }
      })
    )
};
