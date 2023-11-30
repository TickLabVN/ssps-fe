import { useCallback, useEffect, useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowUpTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { Orders, Slides } from '@components/home';
import { useOrderWorkflow } from '@components/order/common';
import { OrderListDesktop, ConfirmOrderDektop } from '@components/order/desktop';
import { ScreenSize } from '@constants';
import { usePrintingRequestMutation, useScreenSize } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export function HomePage() {
  const { createPrintingRequest, uploadFile, cancelPrintingRequest } = usePrintingRequestMutation();
  const { totalCost, isFileUploadSuccess, setIsFileUploadSuccess } = useOrderPrintStore();
  const { desktopOrderStep, mobileOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
  const { openOrderWorkflow, closeOrderWorkflow, OrderWorkflow } = useOrderWorkflow();

  const { screenSize } = useScreenSize();
  const [openBox, setOpenBox] = useState<boolean>(false);
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
  }, [
    screenSize,
    uploadFile,
    desktopOrderStep,
    isFileUploadSuccess,
    closeOrderWorkflow,
    openOrderWorkflow
  ]);

  const ChooseFileBox = () => {
    const queryClient = useQueryClient();
    const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);

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
      [printingRequestId]
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
      </>
    );
  };

  const HomePageContent = () => {
    const handleOrderPrinting = async () => {
      await createPrintingRequest.mutateAsync();
      setOpenBox(true);
    };

    if (desktopOrderStep === 0) {
      return (
        <>
          <div className='p-6 lg:py-4 lg:px-24'>
            <div className='mb-4 lg:mb-6'>
              <h4 className='font-normal text-blue/1 text-base lg:text-xl'>
                Student Smart Printing Service (SSPS)
              </h4>
              <h3 className='font-bold text-blue/2 text-xl lg:text-3xl'>Welcome Username!</h3>
            </div>
            <div className='mb-4 lg:mb-12'>
              <Slides />
            </div>
            <div
              className='flex items-center justify-between bg-blue/1 rounded-lg p-4 mb-16 lg:mb-24 lg:h-[120px] lg:px-6 cursor-pointer'
              onClick={handleOrderPrinting}
            >
              <div className='flex items-center gap-4'>
                <PrinterIcon
                  strokeWidth={2}
                  className='bg-white text-blue-500 rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 lg:p-3'
                />
                <span className='text-white font-bold lg:text-2xl'>Order printing</span>
              </div>
              <ArrowRightIcon strokeWidth={3} className='text-white w-4 h-4 lg:w-6 lg:h-6' />
            </div>
            <Orders />
          </div>
          <ChooseFileBox />
        </>
      );
    } else if (desktopOrderStep === 1) {
      return <OrderListDesktop initialTotalCost={initialTotalCost} />;
    } else if (desktopOrderStep === 2) {
      return <ConfirmOrderDektop />;
    }
  };

  return (
    <>
      <OrderWorkflow initialTotalCost={initialTotalCost} />
      <HomePageContent />;
    </>
  );
}
