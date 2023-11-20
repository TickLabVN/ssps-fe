import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useUploadAndPreviewDocBox } from '@components/order/desktop';
import { useOrderWorkflowBox } from '@components/order/mobile';
import { ScreenSize } from '@constants';
import { useScreenSize, usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export function useChooseFileBox() {
  const queryClient = useQueryClient();
  const [openBox, setOpenBox] = useState<boolean>(false);

  const { openUploadAndPreviewDocBox, closeUploadAndPreviewDocBox, UploadAndPreviewDocBox } =
    useUploadAndPreviewDocBox();
  const { openOrderWorkflowBox, closeOrderWorkflowBox, OrderWorkflowBox } = useOrderWorkflowBox();

  const ChooseFileBox = () => {
    const fileMetadata = queryClient.getQueryData<FileMetadata>(['fileMetadata']);
    const { screenSize } = useScreenSize();
    const { desktopOrderStep, setMobileOrderStep } = useOrderWorkflowStore();
    const { setTotalCost, isFileUploadSuccess, setIsFileUploadSuccess } = useOrderPrintStore();
    const { uploadFile } = usePrintingRequestMutation();

    useEffect(() => {
      if (fileMetadata?.fileCoin) {
        setTotalCost(fileMetadata?.fileCoin);
      }
    }, [fileMetadata?.fileCoin, setTotalCost]);

    useEffect(() => {
      if (isFileUploadSuccess) {
        if (screenSize <= ScreenSize.MD) {
          openOrderWorkflowBox();
        } else {
          if (desktopOrderStep === 0) {
            openUploadAndPreviewDocBox();
          }
        }
      } else {
        closeOrderWorkflowBox();
        closeUploadAndPreviewDocBox();
      }
    }, [screenSize, uploadFile, desktopOrderStep, isFileUploadSuccess]);

    const handleUploadDocument = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const printingRequestId = queryClient.getQueryData<PrintingRequestId>([
            'printingRequestId'
          ]);
          if (!event.target.files[0] || !printingRequestId) return;
          await uploadFile.mutateAsync({
            printingRequestId: printingRequestId.id,
            file: event.target.files[0]
          });
          setIsFileUploadSuccess(true);
          setOpenBox(false);
          if (screenSize <= ScreenSize.MD) {
            openOrderWorkflowBox();
          } else {
            openUploadAndPreviewDocBox();
          }
          setMobileOrderStep(0);
        }
      },
      [screenSize, uploadFile, setMobileOrderStep, setIsFileUploadSuccess]
    );

    return (
      <>
        <Dialog
          className='2xl:max-w-fit 2xl:w-fit 2xl:min-w-fit lg:max-w-fit lg:w-fit lg:min-w-fit max-w-fit w-fit min-w-fit'
          open={openBox}
          handler={() => setOpenBox(false)}
          dismiss={{
            outsidePress: true
          }}
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
        {screenSize <= ScreenSize.MD ? <OrderWorkflowBox /> : <UploadAndPreviewDocBox />}
      </>
    );
  };

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
