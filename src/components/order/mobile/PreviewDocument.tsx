import DocViewer, { DocViewerRenderers, IHeaderOverride } from '@cyntler/react-doc-viewer';
import { IconButton } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useFileStore, useOrderWorkflowStore } from '@states';

export function PreviewDocument() {
  const { fileTarget } = useFileStore();
  const { setMobileOrderStep } = useOrderWorkflowStore();

  const MyHeader: IHeaderOverride = (state) => {
    return (
      <div
        className={
          'flex justify-between items-center px-6 bg-white ' +
          (state.currentDocument?.fileType !== 'application/pdf' ? 'py-3 mb-6 shadow-md' : '')
        }
      >
        <span className='text-gray/4 font-bold'>Preview document</span>
        <IconButton variant='text' onClick={() => setMobileOrderStep(1)}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
      </div>
    );
  };

  return (
    <div className='h-screen overscroll-y-auto'>
      {fileTarget && (
        <DocViewer
          config={{
            header: {
              overrideComponent: MyHeader,
              disableFileName: true
            },
            pdfVerticalScrollByDefault: true
          }}
          pluginRenderers={DocViewerRenderers}
          documents={[{ uri: fileTarget.url }]}
        />
      )}
    </div>
  );
}
