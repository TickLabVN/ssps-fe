import DocViewer, { DocViewerRenderers, IHeaderOverride } from '@cyntler/react-doc-viewer';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useFileStore } from '@states/home';

export function PreviewDocument() {
  const { fileTarget } = useFileStore();

  const MyHeader: IHeaderOverride = (state) => {
    console.log(state.currentDocument?.fileType);
    return (
      <div
        className={
          'flex justify-between px-6 py-3 bg-white mb-6 ' +
          (state.currentDocument?.fileType !== 'application/pdf' ? 'shadow-md' : '')
        }
      >
        <span className='text-gray/4 font-bold'>Preview document</span>
        <XMarkIcon width={28} />
      </div>
    );
  };

  return (
    <>
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
    </>
  );
}
