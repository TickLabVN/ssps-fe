import { ChangeEvent, MutableRefObject, useCallback } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, IconButton, Input, Option, Radio, Select } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {
  useLayoutSide,
  useCloseForm,
  FileBox,
  FileInfo,
  FormFooter
} from '@components/order/common';
import { LAYOUT_SIDE, FILE_CONFIG, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';
import { usePrintingRequestMutation, emitEvent } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export const UploadAndPreviewDesktop: Component<{
  initialTotalCost: MutableRefObject<number>;
  handleCloseUploadForm: () => void;
}> = ({ initialTotalCost, handleCloseUploadForm }) => {
  const queryClient = useQueryClient();
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);
  const fileIdCurrent = queryClient.getQueryData<string>(['fileIdCurrent']);
  const { data: fileMetadata } = useQuery({
    queryKey: ['fileMetadata', fileIdCurrent],
    queryFn: () =>
      fileIdCurrent ? queryClient.getQueryData<FileMetadata>(['fileMetadata', fileIdCurrent]) : null
  });

  const { openLayoutSide, LayoutSide } = useLayoutSide();
  const { openCloseForm, CloseForm } = useCloseForm();

  const { uploadFileConfig, deleteFile, cancelPrintingRequest } = usePrintingRequestMutation();

  const { setDesktopOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
  const {
    isOrderUpdate,
    fileConfig,
    totalCost,
    specificPage,
    pageBothSide,
    setFileConfig,
    setSpecificPage,
    setPageBothSide,
    setTotalCost,
    setIsFileUploadSuccess,
    setIsOrderUpdate,
    clearFileConfig,
    clearSpecificPageAndPageBothSide
  } = useOrderPrintStore();

  const handlePageBothSide = useCallback(
    (event: string) => {
      setPageBothSide(event);
      setFileConfig(FILE_CONFIG.pageSide, event);
    },
    [setFileConfig, setPageBothSide]
  );

  const handleSaveFileConfig = useCallback(async () => {
    if (fileMetadata?.fileId) {
      await uploadFileConfig.mutateAsync({
        fileId: fileMetadata.fileId,
        fileConfig: fileConfig
      });
      initialTotalCost.current = totalCost;
      clearFileConfig();
      clearSpecificPageAndPageBothSide();
      setIsOrderUpdate(true);
      setDesktopOrderStep(1);
      setMobileOrderStep({
        current: 2,
        prev: 0
      });
      handleCloseUploadForm();
    }
  }, [
    fileConfig,
    uploadFileConfig,
    totalCost,
    fileMetadata?.fileId,
    initialTotalCost,
    clearFileConfig,
    clearSpecificPageAndPageBothSide,
    setIsOrderUpdate,
    setDesktopOrderStep,
    setMobileOrderStep,
    handleCloseUploadForm
  ]);

  const handleExistCloseForm = useCallback(async () => {
    if (isOrderUpdate) {
      if (fileMetadata) {
        await deleteFile.mutateAsync(fileMetadata.fileId);
        setTotalCost(totalCost - fileMetadata.fileCoin * fileConfig.numOfCopies);
        emitEvent('listFiles:refetch');
      }
      setDesktopOrderStep(1);
      setMobileOrderStep({
        current: 2,
        prev: 0
      });
    } else {
      initialTotalCost.current = 0;
      setTotalCost(0);
      setIsFileUploadSuccess(false);
      if (printingRequestId?.id) {
        await cancelPrintingRequest.mutateAsync(printingRequestId.id);
      }
    }
    clearFileConfig();
    clearSpecificPageAndPageBothSide();
    handleCloseUploadForm();
  }, [
    initialTotalCost,
    fileConfig.numOfCopies,
    isOrderUpdate,
    totalCost,
    fileMetadata,
    printingRequestId?.id,
    deleteFile,
    cancelPrintingRequest,
    clearFileConfig,
    clearSpecificPageAndPageBothSide,
    setTotalCost,
    setIsFileUploadSuccess,
    setDesktopOrderStep,
    setMobileOrderStep,
    handleCloseUploadForm
  ]);

  const handleOpenCloseForm = async () => {
    if (fileMetadata?.fileId) {
      openCloseForm();
    } else {
      if (isOrderUpdate) {
        if (fileMetadata?.fileId) {
          openCloseForm();
        } else {
          setDesktopOrderStep(1);
          setMobileOrderStep({
            current: 2,
            prev: 0
          });
        }
      } else {
        setIsFileUploadSuccess(false);
        handleCloseUploadForm();
      }
    }
  };

  const handleLayoutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageBothSide(
      e.target.value === LAYOUT_SIDE.portrait
        ? PAGE_SIDE.both.portrait[0]!
        : PAGE_SIDE.both.landscape[0]!
    );
    setFileConfig(
      FILE_CONFIG.pageSide,
      e.target.value === LAYOUT_SIDE.portrait
        ? PAGE_SIDE.both.portrait[0]!
        : PAGE_SIDE.both.landscape[0]!
    );
    setFileConfig(FILE_CONFIG.layout, e.target.value);
  };
  const handlePagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileConfig(FILE_CONFIG.pages, e.target.value);
  };
  const handlePageSideChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileConfig(FILE_CONFIG.pageSide, e.target.value);
  };

  const PreviewDocument = () => {
    const { data: fileURL } = useQuery({
      queryKey: ['fileURL'],
      queryFn: () => queryClient.getQueryData<string>(['fileURL'])
    });
    const PreviewBody = () => {
      return (
        <DocViewer
          config={{
            header: {
              disableFileName: true
            },
            pdfVerticalScrollByDefault: true
          }}
          pluginRenderers={DocViewerRenderers}
          documents={[{ uri: fileURL ?? '', fileType: 'application/pdf' }]}
        />
      );
    };
    return <PreviewBody />;
  };

  return (
    <>
      <div className='flex justify-end'>
        <IconButton variant='text' onClick={handleOpenCloseForm}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
        <CloseForm handleSave={handleSaveFileConfig} handleExist={handleExistCloseForm} />
      </div>
      <div className='grid grid-cols-3 gap-4 bg-gray-200 p-0'>
        <div className='flex flex-col bg-white'>
          <div className='h-[30rem] overflow-y-auto'>
            <div className='border-b-2'>
              <p className='text-gray/4 text-xl font-bold px-4'>Upload document</p>
              {fileMetadata ? (
                <FileInfo
                  fileExtraMetadata={{ ...fileMetadata, numOfCopies: fileConfig.numOfCopies }}
                  isConfigStep={true}
                />
              ) : (
                <div className='p-2'>
                  <FileBox />
                </div>
              )}
            </div>
            <div
              className={
                'flex flex-col gap-4 p-4 text-gray/4 bg-white' +
                (!fileMetadata && ' blur-sm pointer-events-none')
              }
            >
              <div>
                <span className='text-xl font-bold'>Layout</span>
                <div className='flex flex-col -ml-3'>
                  {[LAYOUT_SIDE.portrait, LAYOUT_SIDE.landscape].map((item, index) => (
                    <Radio
                      key={index}
                      label={item}
                      value={item}
                      onChange={handleLayoutChange}
                      checked={fileConfig.layout === item}
                      crossOrigin=''
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className='text-xl font-bold'>Pages</span>
                <div className='flex flex-col -ml-3'>
                  {[PAGES_SPECIFIC.all, PAGES_SPECIFIC.odd, PAGES_SPECIFIC.even].map(
                    (item, index) => (
                      <Radio
                        key={index}
                        label={item}
                        value={item}
                        onChange={handlePagesChange}
                        checked={fileConfig.pages === item}
                        crossOrigin=''
                      />
                    )
                  )}
                  <Radio
                    label={
                      <Input
                        label='Specific Pages'
                        value={specificPage}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          setSpecificPage(event.target.value);
                          setFileConfig(FILE_CONFIG.pages, event.target.value);
                        }}
                        crossOrigin=''
                      />
                    }
                    value={specificPage}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setFileConfig(FILE_CONFIG.pages, event.target.value)
                    }
                    checked={fileConfig.pages === specificPage}
                    crossOrigin=''
                  />
                </div>
              </div>
              <div>
                <span className='text-xl font-bold mb-4'>Pages per sheet</span>
                <Select
                  label='Select an option'
                  value={fileConfig.pagesPerSheet}
                  onChange={(event) => {
                    if (event) {
                      setFileConfig(FILE_CONFIG.pagesPerSheet, event);
                    }
                  }}
                >
                  {PAGES_PER_SHEET.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <span className='font-bold text-xl'>Page Side</span>
                <div className='-ml-3'>
                  <Radio
                    label={PAGE_SIDE.one}
                    value={PAGE_SIDE.one}
                    onChange={handlePageSideChange}
                    checked={fileConfig.pageSide === PAGE_SIDE.one}
                    crossOrigin=''
                  />
                  <div className='flex items-center gap-4'>
                    <Radio
                      label={
                        fileConfig.layout === LAYOUT_SIDE.portrait ? (
                          <Select
                            key={LAYOUT_SIDE.portrait}
                            label='Both sides'
                            value={pageBothSide}
                            onChange={(event) => {
                              if (event) {
                                handlePageBothSide(event);
                              }
                            }}
                          >
                            {PAGE_SIDE.both.portrait.map((item, index) => (
                              <Option key={index} value={item}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                        ) : (
                          <Select
                            key={LAYOUT_SIDE.landscape}
                            label='Both sides'
                            value={pageBothSide}
                            onChange={(event) => {
                              if (event) {
                                handlePageBothSide(event);
                              }
                            }}
                          >
                            {PAGE_SIDE.both.landscape.map((item, index) => (
                              <Option key={index} value={item}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                        )
                      }
                      value={pageBothSide}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setFileConfig(FILE_CONFIG.pageSide, event.target.value)
                      }
                      checked={fileConfig.pageSide === pageBothSide}
                      crossOrigin=''
                    />
                    <ExclamationCircleIcon
                      className='w-6 h-6 cursor-pointer text-gray-500 hover:text-black'
                      onClick={openLayoutSide}
                    />
                    <LayoutSide
                      layout={fileConfig.layout}
                      pageSide={fileConfig.pageSide}
                      handlePageBothSide={handlePageBothSide}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FormFooter totalCost={totalCost}>
            <Button
              color={fileMetadata && fileMetadata.fileSize > 0 ? 'blue' : 'gray'}
              className='rounded-none w-[30%]'
              onClick={handleSaveFileConfig}
              disabled={!fileMetadata || fileMetadata.fileSize === 0}
            >
              <span className='text-base'>Save</span>
            </Button>
          </FormFooter>
        </div>
        <div className='h-[34rem] overflow-y-auto col-span-2'>{<PreviewDocument />}</div>
      </div>
    </>
  );
};
