import { Button } from '@material-tailwind/react';
import { useFileStore } from '@states/home';
import { useOrderWorkflowStore } from '@states/order';

// Tan's first-task in here.
export function UploadDocumentForm() {
  const { setOrderStep } = useOrderWorkflowStore();
  const { fileTarget } = useFileStore();
  console.log(fileTarget);

  return (
    <>
      <div>UploadDocumentForm</div>
      {fileTarget && <img src={fileTarget.url} alt='docs' width='30%' />}
      <Button onClick={() => setOrderStep(2)}>Save</Button>
    </>
  );
}
