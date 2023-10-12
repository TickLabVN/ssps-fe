import { Button } from '@material-tailwind/react';
import { useOrderWorkflowStore } from '@states/order';

// Tan's third-task in here.
export function ConfirmOrderForm() {
  const { setOrderStep } = useOrderWorkflowStore();

  return (
    <>
      <div>ConfirmOrderForm</div>
      <Button onClick={() => setOrderStep(5)}>Confirm</Button>
      <Button onClick={() => setOrderStep(2)}>Back</Button>
      <Button onClick={() => setOrderStep(4)}>Print wallet</Button>
    </>
  );
}
