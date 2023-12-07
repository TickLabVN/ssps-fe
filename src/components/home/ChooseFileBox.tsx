import { useCallback, useEffect, useState, MutableRefObject } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useOrderWorkflow } from '@components/order/common';
import { ScreenSize } from '@constants';
import { useScreenSize, usePrintingRequestMutation, usePrintingRequestQuery } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export function useChooseFileBox() {
  const queryClient = useQueryClient();
  const [openBox, setOpenBox] = useState<boolean>(false);
  const { openOrderWorkflow, closeOrderWorkflow, OrderWorkflow } = useOrderWorkflow();

  const ChooseFileBox: Component<{
    initialTotalCost: MutableRefObject<number>;
    handleOpenOrderSuccessDesktop: () => void;
    handleCloseOrderSuccessDesktop: () => void;
  }> = ({ initialTotalCost, handleOpenOrderSuccessDesktop, handleCloseOrderSuccessDesktop }) => {
    const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);
    const fileIdCurrent = queryClient.getQueryData<string>(['fileIdCurrent']) || null;
    const { data: fileMetadata } = useQuery({
      queryKey: ['fileMetadata', fileIdCurrent],
      queryFn: () => queryClient.getQueryData<FileMetadata>(['fileMetadata', fileIdCurrent]) || null
    });
    const { screenSize } = useScreenSize();
    const { desktopOrderStep, mobileOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
    const { isFileUploadSuccess, isOrderSuccess, setIsFileUploadSuccess, setTotalCost } =
      useOrderPrintStore();

    const {
      fileUploadRequirement: [acceptedFileExtension, maxFileSize]
    } = usePrintingRequestQuery();
    const { uploadFile, cancelPrintingRequest } = usePrintingRequestMutation();

    useEffect(() => {
      if (fileMetadata?.fileId) {
        setTotalCost(initialTotalCost.current + fileMetadata?.fileCoin);
      }
    }, [fileMetadata?.fileId, fileMetadata?.fileCoin, initialTotalCost, setTotalCost]);

    useEffect(() => {
      if (isFileUploadSuccess) {
        if (screenSize <= ScreenSize.MD) {
          openOrderWorkflow();
          if (isOrderSuccess) {
            handleCloseOrderSuccessDesktop();
          }
        } else {
          if (desktopOrderStep === 0) {
            openOrderWorkflow();
          } else {
            closeOrderWorkflow();
          }
          if (isOrderSuccess) {
            handleOpenOrderSuccessDesktop();
          }
        }
      } else {
        closeOrderWorkflow();
      }
    }, [
      screenSize,
      desktopOrderStep,
      isFileUploadSuccess,
      isOrderSuccess,
      handleOpenOrderSuccessDesktop,
      handleCloseOrderSuccessDesktop
    ]);

    const handleUploadDocument = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          if (!event.target.files[0] || !printingRequestId) return;
          await uploadFile.mutateAsync({
            printingRequestId: printingRequestId.id,
            file: event.target.files[0]
          });
          setIsFileUploadSuccess(true);
          setOpenBox(false);
          openOrderWorkflow();
          setMobileOrderStep({
            current: 0,
            prev: mobileOrderStep.current
          });
        }
      },
      [uploadFile, mobileOrderStep, printingRequestId, setMobileOrderStep, setIsFileUploadSuccess]
    );

    const handleCloseDialog = async () => {
      if (!printingRequestId) return;
      await cancelPrintingRequest.mutateAsync(printingRequestId.id);
      setOpenBox(false);
    };

    return (
      <>
        <Dialog
          className='2xl:max-w-fit 2xl:w-fit 2xl:min-w-fit lg:max-w-fit lg:w-fit lg:min-w-fit max-w-fit w-fit min-w-fit'
          open={openBox}
          handler={handleCloseDialog}
        >
          <DialogBody>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center w-[310px] h-[148px] gap-4 p-4 lg:w-[384px] lg:h-[190px] lg:p-7 border-2 border-blue/1 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'
            >
              <div className='flex items-center gap-4'>
                <ArrowUpTrayIcon
                  strokeWidth={2}
                  className='bg-blue/1 text-white rounded-full w-[40px] h-[40px] p-2 lg:w-[48px] lg:h-[48px] lg:p-3'
                />
                <span className='text-xl lg:text-2xl text-blue/1 font-semibold h-[40px] p-1 lg:h-[48px] lg:p-2'>
                  Choose file to print
                </span>
              </div>

              <div className='text-sm lg:text-md w-54 h-13 gap-1'>
                <span className='font-semibold h-8'>Allowed formats:</span>{' '}
                {acceptedFileExtension.data?.map((fileType) => `.${fileType}`).join(', ')}
                <div className='text-sm lg:text-md h-4'>
                  <span className='font-semibold'>Maximum size:</span>{' '}
                  {maxFileSize.data !== undefined && formatFileSize(maxFileSize.data)}
                </div>
              </div>

              <input
                id='dropzone-file'
                type='file'
                className='hidden'
                onChange={handleUploadDocument}
              />
            </label>
          </DialogBody>
        </Dialog>
        {<OrderWorkflow initialTotalCost={initialTotalCost} />}
      </>
    );
  };

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
