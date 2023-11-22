import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import { useCloseForm, useLayoutSide, FileBox, FormFooter } from '@components/order/common';
import { LAYOUT_SIDE, FILE_CONFIG, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';
import { usePrintingRequestMutation } from '@hooks';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states';
import { FileInfo } from './FileInfo';

export const UploadDocumentForm: Component<{ handleExistOrderForm: () => void }> = ({
  handleExistOrderForm
}) => {
  const queryClient = useQueryClient();
  const fileIdCurrent = queryClient.getQueryData<string>(['fileIdCurrent']);
  const { data: fileMetadata } = useQuery({
    queryKey: ['fileMetadata', fileIdCurrent],
    queryFn: () => queryClient.getQueryData<FileMetadata>(['fileMetadata', fileIdCurrent])
  });
  const { uploadFileConfig } = usePrintingRequestMutation();
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const {
    totalCost,
    fileConfig,
    setFileConfig,
    resetFileConfig,
    setTotalCost,
    setIsFileUploadSuccess
  } = useOrderPrintStore();
  const { openLayoutSide, LayoutSide } = useLayoutSide();
  const { openCloseForm, CloseForm } = useCloseForm();

  const initialFileConfig = useRef<FileConfig>({
    numOfCopies: fileConfig.numOfCopies,
    layout: fileConfig.layout,
    pages: fileConfig.pages,
    pagesPerSheet: fileConfig.pagesPerSheet,
    pageSide: fileConfig.pageSide
  });
  const initialTotalCost = useRef<number>(totalCost);

  const [specificPage, setSpecificPage] = useState<string>('');
  const [pageBothSide, setPageBothSide] = useState<string>(
    fileConfig.layout === LAYOUT_SIDE.portrait
      ? PAGE_SIDE.both.portrait[0]!
      : PAGE_SIDE.both.landscape[0]!
  );

  useEffect(() => {
    if (fileMetadata?.fileCoin) {
      setTotalCost(initialTotalCost.current + fileMetadata?.fileCoin);
    }
  }, [fileMetadata?.fileCoin, setTotalCost]);

  const handlePageBothSide = useCallback(
    (event: string) => {
      setPageBothSide(event);
      setFileConfig(FILE_CONFIG.pageSide, event);
    },
    [setFileConfig]
  );

  const handleSaveFileConfig = useCallback(async () => {
    if (fileMetadata?.fileId) {
      await uploadFileConfig.mutateAsync({
        fileId: fileMetadata.fileId,
        fileConfig: fileConfig
      });
      setMobileOrderStep(2);
    }
  }, [fileMetadata?.fileId, fileConfig, setMobileOrderStep, uploadFileConfig]);

  const handleExistCloseForm = useCallback(() => {
    resetFileConfig(initialFileConfig.current);
    setTotalCost(0);
    setIsFileUploadSuccess(false);
    handleExistOrderForm();
  }, [handleExistOrderForm, resetFileConfig, setTotalCost, setIsFileUploadSuccess]);

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

  return (
    <>
      <div className='flex justify-between items-center shadow-md px-6 py-3 bg-white mb-6'>
        <span className='text-gray/4 font-bold'>Upload document</span>
        <IconButton variant='text' onClick={openCloseForm}>
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
          'p-6 text-gray/4 bg-white mt-4 blur-sm' +
          (!fileMetadata && ' blur-sm pointer-events-none')
        }
      >
        <div className='mb-8'>
          <Typography className='font-bold'>Layout</Typography>
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
        <div className='mb-8'>
          <Typography className='font-bold'>Pages</Typography>
          <div className='flex flex-col -ml-3'>
            {[PAGES_SPECIFIC.all, PAGES_SPECIFIC.odd, PAGES_SPECIFIC.even].map((item, index) => (
              <Radio
                key={index}
                label={item}
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
          <Typography className='font-bold'>Page Side</Typography>
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
      <FormFooter totalCost={fileMetadata ? totalCost : 0}>
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
