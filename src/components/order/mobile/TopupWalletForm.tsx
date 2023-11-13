import { Button } from '@material-tailwind/react';
import { useOrderWorkflowStore } from '@states';

// Tue's first-task in here.
export function TopupWalletForm() {
  const { setMobileOrderStep } = useOrderWorkflowStore();

  return (
    <>
      <div>TopupWalletForm</div>
      <Button onClick={() => setMobileOrderStep(3)}>Top up wallet</Button>
    </>
  );
}
