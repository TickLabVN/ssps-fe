import { ChangeEvent, useCallback, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Option,
  Radio,
  Select,
  Typography
} from '@material-tailwind/react';
import {
  ExclamationCircleIcon,
  EyeIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import coinImage from '@assets/coin.png';
import { useCloseForm, useLayoutSide, FormFooter } from '@components/order/common';
import { LAYOUT_SIDE, FILE_CONFIG, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states';
import { formatFileSize } from '@utils';

export const UploadDocumentForm: Component<{ handleExistOrderForm: () => void }> = ({
  handleExistOrderForm
}) => {
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const {
    fileMetadata,
    fileConfig,
    totalCost,
    setFileConfig,
    resetFileConfig,
    setTotalCost,
    uploadConfigFile,
    resetOrderStatus
  } = useOrderPrintStore();
  const { openLayoutSide, LayoutSide } = useLayoutSide();
  const { openCloseForm, CloseForm } = useCloseForm();

  const initialFileConfig = useRef<FileConfig>({
    numOfCopy: fileConfig.numOfCopy,
    layout: fileConfig.layout,
    pages: fileConfig.pages,
    pagesPerSheet: fileConfig.pagesPerSheet,
    pageSide: fileConfig.pageSide
  });
  const [specificPage, setSpecificPage] = useState<string>('');
  const [pageBothSide, setPageBothSide] = useState<string>(
    fileConfig.layout === LAYOUT_SIDE.portrait
      ? PAGE_SIDE.both.portrait[0]
      : PAGE_SIDE.both.landscape[0]
  );

  const handleDecreaseCopies = () => {
    if (parseInt(fileConfig.numOfCopy) > 1) {
      setFileConfig(FILE_CONFIG.numOfCopy, `${parseInt(fileConfig.numOfCopy) - 1}`);
      setTotalCost(totalCost - fileMetadata.fileCoin);
    }
  };
  const handleIncreaseCopies = () => {
    setFileConfig(FILE_CONFIG.numOfCopy, `${parseInt(fileConfig.numOfCopy) + 1}`);
    setTotalCost(totalCost + fileMetadata.fileCoin);
  };
  const handleLayoutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageBothSide(
      e.target.value === LAYOUT_SIDE.portrait
        ? PAGE_SIDE.both.portrait[0]
        : PAGE_SIDE.both.landscape[0]
    );
    setFileConfig(
      FILE_CONFIG.pageSide,
      e.target.value === LAYOUT_SIDE.portrait
        ? PAGE_SIDE.both.portrait[0]
        : PAGE_SIDE.both.landscape[0]
    );
    setFileConfig(FILE_CONFIG.layout, e.target.value);
  };
  const handlePagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileConfig(FILE_CONFIG.pages, e.target.value);
  };
  const handlePageSideChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileConfig(FILE_CONFIG.pageSide, e.target.value);
  };

  const handlePageBothSide = useCallback(
    (event: string) => {
      setPageBothSide(event);
      setFileConfig(FILE_CONFIG.pageSide, event);
    },
    [setFileConfig]
  );

  const handleSaveFileConfig = useCallback(async () => {
    await uploadConfigFile(fileMetadata.fileId, fileConfig);
    setMobileOrderStep(2);
  }, [fileConfig, fileMetadata.fileId, setMobileOrderStep, uploadConfigFile]);

  const handleExistCloseForm = useCallback(() => {
    resetFileConfig(initialFileConfig.current);
    setTotalCost(0);
    resetOrderStatus();
    handleExistOrderForm();
  }, [handleExistOrderForm, resetFileConfig, setTotalCost, resetOrderStatus]);

  return (
    <>
      <div className='flex justify-between items-center shadow-md px-6 py-3 bg-white mb-6'>
        <span className='text-gray/4 font-bold'>Upload document</span>
        <IconButton variant='text' onClick={openCloseForm}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
        <CloseForm handleSave={handleSaveFileConfig} handleExist={handleExistCloseForm} />
      </div>
      <div className='flex gap-4 px-4 py-2 bg-white '>
        <div
          className='text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer'
          onClick={() => setMobileOrderStep(1)}
        >
          <EyeIcon width={20} />
          <span className='text-xs'>Preview</span>
        </div>
        <div className='w-full'>
          <div className='flex flex-col text-gray/4'>
            <div className='flex items-center font-medium'>
              <p className='text-gray/4 w-64 truncate'>{fileMetadata.fileName}</p>
              <p className='text-gray/3'>{`(${formatFileSize(fileMetadata.fileSize)})`}</p>
            </div>
            <p className='flex items-center gap-1 text-sm mb-5'>
              <img src={coinImage} className='grayscale w-6 h-6' />
              <span className='text-gray/4 font-normal'>
                {fileMetadata.fileCoin} x {fileConfig.numOfCopy} copies ={' '}
              </span>
              <img src={coinImage} className='w-6 h-6' />
              <span className='text-yellow/1 font-bold'>
                {fileMetadata.fileCoin * parseInt(fileConfig.numOfCopy)}
              </span>
            </p>
          </div>
          <div className='flex justify-between items-center '>
            <div className='flex border-2 '>
              <span
                className='p-0.5 border-r-2 flex items-center cursor-pointer'
                onClick={handleDecreaseCopies}
              >
                <MinusIcon width={20} />
              </span>
              {parseInt(fileConfig.numOfCopy) > 0 && (
                <span className='py-0.5 px-6'>{fileConfig.numOfCopy}</span>
              )}
              <span
                className='p-0.5 border-l-2 flex items-center cursor-pointer'
                onClick={handleIncreaseCopies}
              >
                <PlusIcon width={20} />
              </span>
            </div>
            <TrashIcon className='w-7 h-7' />
          </div>
        </div>
      </div>
      <div className='p-6 text-gray/4 bg-white mt-4'>
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
      <FormFooter totalCost={fileMetadata.fileCoin * parseInt(fileConfig.numOfCopy)}>
        <Button
          color={fileMetadata.fileSize > 0 ? 'blue' : 'gray'}
          className='rounded-none w-[30%]'
          onClick={handleSaveFileConfig}
          disabled={fileMetadata.fileSize === 0}
        >
          <span className='text-base'>Save</span>
        </Button>
      </FormFooter>
    </>
  );
};
