type OrderStatus = 'progressing' | 'ready' | 'done' | 'canceled';
export const ORDER_STATUS: Readonly<Record<string, OrderStatus>> = Object.freeze({
  progressing: 'progressing',
  ready: 'ready',
  done: 'done',
  canceled: 'canceled'
});

type OrderStatusColor = 'amber' | 'green' | 'indigo' | 'red';
export const ORDER_STATUS_COLOR: Readonly<Record<string, OrderStatusColor>> = Object.freeze({
  progressing: 'amber',
  ready: 'green',
  done: 'indigo',
  canceled: 'red'
});
