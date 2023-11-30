import { useCallback, useEffect, useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useOrderWorkflow } from '@components/order/common';
import { ScreenSize } from '@constants';
import { useScreenSize, usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export function useChooseFileBox() {
  const queryClient = useQueryClient();
  const [openBox, setOpenBox] = useState<boolean>(false);
  const { openOrderWorkflow, closeOrderWorkflow, OrderWorkflow } = useOrderWorkflow();

  const ChooseFileBox = () => {
    const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);
    const { screenSize } = useScreenSize();
    const { desktopOrderStep, mobileOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
    const { isFileUploadSuccess, totalCost, setIsFileUploadSuccess } = useOrderPrintStore();
    const { uploadFile, cancelPrintingRequest } = usePrintingRequestMutation();

    const initialTotalCost = useRef<number>(totalCost);

    useEffect(() => {
      if (isFileUploadSuccess) {
        if (screenSize <= ScreenSize.MD) {
          openOrderWorkflow();
        } else {
          if (desktopOrderStep === 0) {
            openOrderWorkflow();
          }
        }
      } else {
        closeOrderWorkflow();
      }
    }, [screenSize, uploadFile, desktopOrderStep, isFileUploadSuccess]);

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
                <span className='font-semibold h-8'>Allowed formats:</span> .doc, .docx, .xls,
                .xlsx, .ppt, .jpg, .png, .pdf
                <div className='text-sm lg:text-md h-4'>
                  <span className='font-semibold'>Maximum size:</span> 100MB
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
