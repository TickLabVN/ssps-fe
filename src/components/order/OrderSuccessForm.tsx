import { Button } from '@material-tailwind/react';
import { useOrderWorkflowStore } from '@states/order';

// Tan's third-task in here.
export function OrderSuccessForm() {
  const { setOrderStep } = useOrderWorkflowStore();

  return (
    <>
      <div>OrderSuccessForm</div>
      <Button onClick={() => setOrderStep(5)}>Track this order</Button>
      <Button onClick={() => setOrderStep(3)}>Back</Button>
    </>
  );
}
