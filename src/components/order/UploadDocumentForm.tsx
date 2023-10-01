import { Button } from '@material-tailwind/react';
import { useOrderWorkflowStore } from '@states/order';

// Tan's first-task in here.
export function UploadDocumentForm() {
  const { setOrderStep } = useOrderWorkflowStore();

  return (
    <>
      <div>UploadDocumentForm</div>
      <Button onClick={() => setOrderStep(2)}>Save</Button>
    </>
  );
}
