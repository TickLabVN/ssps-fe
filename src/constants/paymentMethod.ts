import VNPay from '@assets/VNPay.png';
import momo from '@assets/momo.png';
import zaloPay from '@assets/zaloPay.png';
export const PAYMENT_METHOD = [
  {
    name: 'Pay with Momo wallet',
    img: momo,
    description: 'Redirect to Momo'
  },
  {
    name: 'Pay with Zalo wallet',
    img: zaloPay,
    description: 'Redirect to Zalo Pay'
  },
  {
    name: 'Pay with VNPay',
    img: VNPay,
    description: 'Redirect to VNPay'
  }
];
