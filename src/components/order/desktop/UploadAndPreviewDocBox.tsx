import { ChangeEvent, useCallback, useState, useRef } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Radio,
  Select
} from '@material-tailwind/react';
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { useLayoutSide, FormFooter, useCloseForm } from '@components/order/common';
import { LAYOUT_SIDE, FILE_CONFIG, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';
import { usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore } from '@states';
import { formatFileSize } from '@utils';

export function useUploadAndPreviewDocBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const fileMetadata = queryClient.getQueryData<FileMetadata>(['fileMetadata']);

  const PreviewDocument = () => {
    const PreviewBody = () => {
      if (fileMetadata?.fileURL) {
        return (
          <DocViewer
            config={{
              header: {
                disableFileName: true
              },
              pdfVerticalScrollByDefault: true
            }}
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: fileMetadata.fileURL, fileType: 'application/pdf' }]}
          />
        );
      } else return null;
    };
    return <PreviewBody />;
  };

  const UploadAndPreviewDocBox = () => {
    const { uploadFileConfig } = usePrintingRequestMutation();
    const {
      fileConfig,
      totalCost,
      setFileConfig,
      resetFileConfig,
      setTotalCost,
      setIsFileUploadSuccess
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
        ? PAGE_SIDE.both.portrait[0]!
        : PAGE_SIDE.both.landscape[0]!
    );

    const handleOpenDialog = useCallback(() => setOpenDialog(!openDialog), []);

    const handlePageBothSide = useCallback(
      (event: string) => {
        setPageBothSide(event);
        setFileConfig(FILE_CONFIG.pageSide, event);
      },
      [setFileConfig]
    );

    const handleSaveFileConfig = useCallback(async () => {
      if (fileMetadata) {
        await uploadFileConfig.mutateAsync({
          fileId: fileMetadata.fileId,
          fileConfig: fileConfig
        });
      }
    }, [fileConfig, uploadFileConfig]);

    const handleExistCloseForm = useCallback(() => {
      resetFileConfig(initialFileConfig.current);
      setTotalCost(0);
      setIsFileUploadSuccess(false);
      handleOpenDialog();
    }, [handleOpenDialog, resetFileConfig, setTotalCost, setIsFileUploadSuccess]);

    const handleDecreaseCopies = () => {
      if (fileMetadata && parseInt(fileConfig.numOfCopy) > 1) {
        setFileConfig(FILE_CONFIG.numOfCopy, `${parseInt(fileConfig.numOfCopy) - 1}`);
        setTotalCost(totalCost - fileMetadata.fileCoin);
      }
    };
    const handleIncreaseCopies = () => {
      if (fileMetadata) {
        setFileConfig(FILE_CONFIG.numOfCopy, `${parseInt(fileConfig.numOfCopy) + 1}`);
        setTotalCost(totalCost + fileMetadata.fileCoin);
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

    if (!fileMetadata) return null;

    return (
      <Dialog size='xl' open={openDialog} handler={handleOpenDialog}>
        <DialogHeader className='justify-end p-0 bg-gray-200 rounded-t-md'>
          <IconButton variant='text' onClick={openCloseForm}>
            <XMarkIcon className='w-6 h-6' />
          </IconButton>
          <CloseForm handleSave={handleSaveFileConfig} handleExist={handleExistCloseForm} />
        </DialogHeader>
        <DialogBody className='grid grid-cols-3 gap-4 bg-gray-200 p-0'>
          <div className='flex flex-col bg-white'>
            <div className='h-[30rem] overflow-y-auto'>
              <div className='flex flex-col gap-4 p-4 border-b-2'>
                <div>
                  <span className='text-gray/4 text-xl font-bold'>Upload document</span>
                  <div className='flex items-center font-medium'>
                    <p className='text-gray/4 w-52 truncate'>{fileMetadata.fileName}</p>
                    <p className='text-gray/3'>{`(${formatFileSize(fileMetadata.fileSize)})`}</p>
                  </div>
                  <p className='flex items-center gap-1 text-base'>
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
                <div className='flex items-center justify-between'>
                  <div className='flex border-2'>
                    <span
                      className='p-0.5 border-r-2 flex items-center cursor-pointer'
                      onClick={handleDecreaseCopies}
                    >
                      <MinusIcon className='w-5 h-5' />
                    </span>
                    {parseInt(fileConfig.numOfCopy) > 0 && (
                      <span className='py-0.5 px-6'>{fileConfig.numOfCopy}</span>
                    )}
                    <span
                      className='p-0.5 border-l-2 flex items-center cursor-pointer'
                      onClick={handleIncreaseCopies}
                    >
                      <PlusIcon className='w-5 h-5' />
                    </span>
                  </div>
                  <TrashIcon className='w-7 h-7' />
                </div>
              </div>
              <div className='flex flex-col gap-4 p-4 text-gray/4 bg-white'>
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
          </div>
          <div className='h-[34rem] overflow-y-auto col-span-2'>{<PreviewDocument />}</div>
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openUploadAndPreviewDocBox: () => setOpenDialog(true),
    closeUploadAndPreviewDocBox: () => setOpenDialog(false),
    UploadAndPreviewDocBox: UploadAndPreviewDocBox
  };
}
