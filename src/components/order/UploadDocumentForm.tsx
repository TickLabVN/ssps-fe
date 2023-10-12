import { Button } from '@material-tailwind/react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useFileStore } from '@states/home';
import { useOrderWorkflowStore } from '@states/order';

// Tan's first-task in here.
export function UploadDocumentForm() {
  const { setOrderStep } = useOrderWorkflowStore();
  const { fileTarget } = useFileStore();

  return (
    <>
      <div>UploadDocumentForm</div>
      {fileTarget && (
        <DocViewer pluginRenderers={DocViewerRenderers} documents={[{ uri: fileTarget.url }]} />
      )}
      <Button onClick={() => setOrderStep(2)}>Save</Button>
    </>
  );
}
