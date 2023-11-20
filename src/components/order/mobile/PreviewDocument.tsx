import { useQueryClient } from '@tanstack/react-query';
import DocViewer, { DocViewerRenderers, IHeaderOverride } from '@cyntler/react-doc-viewer';
import { IconButton } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useOrderWorkflowStore } from '@states';

export function PreviewDocument() {
  const queryClient = useQueryClient();
  const fileMetadata = queryClient.getQueryData<FileMetadata>(['fileMetadata']);
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
        <IconButton variant='text' onClick={() => setMobileOrderStep(0)}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
      </div>
    );
  };

  return (
    <div className='h-screen overscroll-y-auto'>
      {fileMetadata && (
        <DocViewer
          config={{
            header: {
              overrideComponent: MyHeader,
              disableFileName: true
            },
            pdfVerticalScrollByDefault: true
          }}
          pluginRenderers={DocViewerRenderers}
          documents={[{ uri: fileMetadata.fileURL, fileType: 'application/pdf' }]}
        />
      )}
    </div>
  );
}
