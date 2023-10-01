import { Button } from '@material-tailwind/react';
import { useOrderWorkflowStore } from '@states/order';

// Tan's second-task in here.
export function OrderListBox() {
  const { setOrderStep } = useOrderWorkflowStore();

  return (
    <>
      <div>OrderListBox</div>
      <Button onClick={() => setOrderStep(3)}>Order</Button>
      <Button onClick={() => setOrderStep(1)}>Back</Button>
    </>
  );
}
