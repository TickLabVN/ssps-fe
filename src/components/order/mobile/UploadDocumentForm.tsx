import { ChangeEvent, MutableRefObject, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PDFDocument } from 'pdf-lib';
import type { Buffer } from 'buffer';
import {
  Button,
  IconButton,
  Input,
  Option,
  Radio,
  Select,
  Typography
} from '@material-tailwind/react';
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
  useCloseForm,
  useLayoutSide,
  FileBox,
  FileInfo,
  FormFooter
} from '@components/order/common';
import { LAYOUT_SIDE, FILE_CONFIG, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';
import { usePrintingRequestMutation, usePrintingRequestQuery, emitEvent } from '@hooks';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states';
import { editPdf } from '@utils';
import type { PagePerSheet } from '@utils';

export const UploadDocumentForm: Component<{
  handleExistOrderForm: () => Promise<void>;
  initialTotalCost: MutableRefObject<number>;
}> = ({ handleExistOrderForm, initialTotalCost }) => {
  const queryClient = useQueryClient();
  const fileIdCurrent = queryClient.getQueryData<string>(['fileIdCurrent']);
  const { data: fileMetadata } = useQuery({
    queryKey: ['fileMetadata', fileIdCurrent],
    queryFn: () => queryClient.getQueryData<FileMetadata>(['fileMetadata', fileIdCurrent])
  });
  const fileBuffer = queryClient.getQueryData<Buffer>(['fileBuffer']);

  const {
    coinPerPage: { data: coinPerPage }
  } = usePrintingRequestQuery();
  const { uploadFileConfig, deleteFile } = usePrintingRequestMutation();
  const { setMobileOrderStep, setDesktopOrderStep } = useOrderWorkflowStore();
  const {
    isOrderUpdate,
    totalCost,
    fileConfig,
    specificPage,
    pageBothSide,
    setFileConfig,
    setSpecificPage,
    setPageBothSide,
    setTotalCost,
    setIsFileUploadSuccess,
    clearFileConfig,
    clearSpecificPageAndPageBothSide,
    setIsOrderUpdate,
    setFileCoins
  } = useOrderPrintStore();
  const { openLayoutSide, LayoutSide } = useLayoutSide();
  const { openCloseForm, CloseForm } = useCloseForm();

  const { editPdfPrinting } = editPdf;

  useEffect(() => {
    const handleEditPdfPrinting = async () => {
      if (fileBuffer) {
        const fileEditedBuffer = await editPdfPrinting(
          fileBuffer,
          fileConfig.pageSide,
          fileConfig.pages,
          fileConfig.layout,
          parseInt(fileConfig.pagesPerSheet) as PagePerSheet
        );
        queryClient.setQueryData(['fileURL'], URL.createObjectURL(new Blob([fileEditedBuffer])));
        if (coinPerPage !== undefined) {
          const pdfDoc = await PDFDocument.load(fileEditedBuffer);
          setFileCoins(pdfDoc.getPageCount() * coinPerPage);
          setTotalCost(initialTotalCost.current + pdfDoc.getPageCount() * coinPerPage);
        }
      }
    };
    handleEditPdfPrinting();
  }, [
    initialTotalCost,
    coinPerPage,
    fileBuffer,
    fileConfig.layout,
    fileConfig.pageSide,
    fileConfig.pages,
    fileConfig.pagesPerSheet,
    queryClient,
    setFileCoins,
    setTotalCost,
    editPdfPrinting
  ]);

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
      setMobileOrderStep({
        current: 2,
        prev: 0
      });
      setDesktopOrderStep(1);
    }
  }, [
    fileMetadata?.fileId,
    fileConfig,
    totalCost,
    uploadFileConfig,
    initialTotalCost,
    setMobileOrderStep,
    setDesktopOrderStep,
    clearFileConfig,
    clearSpecificPageAndPageBothSide,
    setIsOrderUpdate
  ]);

  const handleExistCloseForm = useCallback(async () => {
    if (isOrderUpdate) {
      if (fileMetadata) {
        await deleteFile.mutateAsync(fileMetadata.fileId);
        setTotalCost(totalCost - fileMetadata.fileCoin * fileConfig.numOfCopies);
        emitEvent('listFiles:refetch');
      }
      setMobileOrderStep({
        current: 2,
        prev: 0
      });
      setDesktopOrderStep(1);
    } else {
      initialTotalCost.current = 0;
      setTotalCost(0);
      setIsFileUploadSuccess(false);
      await handleExistOrderForm();
    }
    clearFileConfig();
    clearSpecificPageAndPageBothSide();
  }, [
    fileConfig.numOfCopies,
    fileMetadata,
    totalCost,
    isOrderUpdate,
    deleteFile,
    initialTotalCost,
    handleExistOrderForm,
    clearFileConfig,
    clearSpecificPageAndPageBothSide,
    setTotalCost,
    setIsFileUploadSuccess,
    setMobileOrderStep,
    setDesktopOrderStep
  ]);

  const handleOpenCloseForm = async () => {
    if (fileMetadata?.fileId) {
      openCloseForm();
    } else {
      if (isOrderUpdate) {
        if (fileMetadata?.fileId) {
          openCloseForm();
        } else {
          setMobileOrderStep({
            current: 2,
            prev: 0
          });
          setDesktopOrderStep(1);
        }
      } else {
        setIsFileUploadSuccess(false);
        await handleExistOrderForm();
      }
    }
  };

  const handleLayoutChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setPageBothSide(
      e.target.value === LAYOUT_SIDE.portrait
        ? PAGE_SIDE.both.portrait[0]!.value
        : PAGE_SIDE.both.landscape[0]!.value
    );
    setFileConfig(
      FILE_CONFIG.pageSide,
      e.target.value === LAYOUT_SIDE.portrait
        ? PAGE_SIDE.both.portrait[0]!.value
        : PAGE_SIDE.both.landscape[0]!.value
    );
    setFileConfig(FILE_CONFIG.layout, e.target.value);
    if (e.target.value === LAYOUT_SIDE.landscape && fileConfig.pagesPerSheet === '1') {
      setFileConfig(FILE_CONFIG.pagesPerSheet, '2');
    }
  };
  const handlePagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileConfig(FILE_CONFIG.pages, e.target.value);
  };
  const handlePageSideChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileConfig(FILE_CONFIG.pageSide, e.target.value);
  };

  return (
    <>
      <div className='flex justify-between items-center shadow-md px-6 py-3 bg-white mb-6'>
        <span className='text-gray/4 font-bold'>Upload document</span>
        <IconButton variant='text' onClick={handleOpenCloseForm}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
        <CloseForm handleSave={handleSaveFileConfig} handleExist={handleExistCloseForm} />
      </div>
      {fileMetadata ? (
        <FileInfo
          fileExtraMetadata={{ ...fileMetadata, numOfCopies: fileConfig.numOfCopies }}
          isConfigStep={true}
        />
      ) : (
        <FileBox />
      )}
      <div
        className={
          'p-6 text-gray/4 bg-white mt-4' + (!fileMetadata && ' blur-sm pointer-events-none')
        }
      >
        <div className='mb-8'>
          <Typography className='font-bold'>Layout</Typography>
          <div className='flex flex-col -ml-3'>
            {[LAYOUT_SIDE.portrait, LAYOUT_SIDE.landscape].map((item, index) => (
              <Radio
                key={index}
                label={<span className='capitalize'>{item}</span>}
                value={item}
                onChange={handleLayoutChange}
                checked={fileConfig.layout === item}
                crossOrigin=''
              />
            ))}
          </div>
        </div>
        <div className='mb-8'>
          <Typography className='font-bold'>Pages</Typography>
          <div className='flex flex-col -ml-3'>
            {[PAGES_SPECIFIC.all, PAGES_SPECIFIC.odd, PAGES_SPECIFIC.even].map((item, index) => (
              <Radio
                key={index}
                label={
                  <p>
                    <span className='capitalize'>{item}</span> {index > 0 && ' pages only'}
                  </p>
                }
                value={item}
                onChange={handlePagesChange}
                checked={fileConfig.pages === item}
                crossOrigin=''
              />
            ))}
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
        <div className='mb-8'>
          <Typography className='font-bold mb-4'>Pages per sheet</Typography>
          <Select
            label='Select an option'
            value={`${fileConfig.pagesPerSheet}`}
            onChange={(event) => {
              if (event) {
                setFileConfig(FILE_CONFIG.pagesPerSheet, event);
              }
            }}
          >
            {PAGES_PER_SHEET.map((item) => (
              <Option
                key={item}
                value={item}
                disabled={item === '1' && fileConfig.layout === LAYOUT_SIDE.landscape}
              >
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Typography className='font-bold'>Page Side</Typography>
          <div className='-ml-3'>
            <Radio
              label={<span className='capitalize'>{PAGE_SIDE.one} side</span>}
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
                        <Option key={index} value={item.value}>
                          {item.label}
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
                        <Option key={index} value={item.value}>
                          {item.label}
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
              <LayoutSide layout={fileConfig.layout} handlePageBothSide={handlePageBothSide} />
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
    </>
  );
};
