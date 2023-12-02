import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import DocViewer, { DocViewerRenderers, IHeaderOverride } from '@cyntler/react-doc-viewer';
import { Dialog, DialogBody, IconButton } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export function usePreviewDocumentDesktop() {
  const queryClient = useQueryClient();
  const fileURL = queryClient.getQueryData<string>(['fileURL']);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const MyHeader: IHeaderOverride = (state) => {
    return (
      <div
        className={
          'flex justify-between items-center px-6 bg-white ' +
          (state.currentDocument?.fileType !== 'application/pdf' ? 'py-3 mb-6 shadow-md' : '')
        }
      >
        <span className='text-gray/4 font-bold'>Preview document</span>
        <IconButton variant='text' onClick={() => setOpenDialog(false)}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
      </div>
    );
  };

  const PreviewDocumentDesktop = () => {
    return (
      <Dialog size='md' open={openDialog} handler={() => setOpenDialog(false)}>
        <DialogBody>
          <div className='h-[36rem] overscroll-y-auto'>
            {fileURL && (
              <DocViewer
                config={{
                  header: {
                    overrideComponent: MyHeader,
                    disableFileName: true
                  },
                  pdfVerticalScrollByDefault: true
                }}
                pluginRenderers={DocViewerRenderers}
                documents={[{ uri: fileURL, fileType: 'application/pdf' }]}
              />
            )}
          </div>
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openPreviewDocumentDesktop: () => setOpenDialog(true),
    PreviewDocumentDesktop: PreviewDocumentDesktop
  };
}
