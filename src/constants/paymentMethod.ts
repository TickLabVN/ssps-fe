import VNPay from '@assets/VNPay.png';
import momo from '@assets/momo.png';
import zaloPay from '@assets/zaloPay.png';
export const PAYMENT_METHOD = [
  {
    name: 'Pay with Momo wallet',
    src: momo,
    description: 'Redirect to Momo'
  },
  {
    name: 'Pay with Zalo wallet',
    src: zaloPay,
    description: 'Redirect to Zalo Pay'
  },
  {
    name: 'Pay with VNPay',
    src: VNPay,
    description: 'Redirect to VNPay'
  }
];
