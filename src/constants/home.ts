export const ORDER_STATUS: { [key: string]: OrderStatus } = {
  progressing: 'progressing',
  ready: 'ready',
  done: 'done',
  canceled: 'canceled'
};

export const ORDER_STATUS_COLOR = {
  progressing: 'amber',
  ready: 'green',
  done: 'indigo',
  canceled: 'red'
};
