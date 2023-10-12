import { Button } from '@material-tailwind/react';
import { useOrderWorkflowStore } from '@states/order';

// Tan's second-task in here.
export function OrderListForm() {
  const { setOrderStep } = useOrderWorkflowStore();

  return (
    <>
      <div>OrderListForm</div>
      <Button onClick={() => setOrderStep(3)}>Order</Button>
      <Button onClick={() => setOrderStep(1)}>Back</Button>
    </>
  );
}
