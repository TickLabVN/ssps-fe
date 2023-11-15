import { useMemo } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export function FileBox() {
  const { screenSize } = useScreenSize();
  const { printingRequestId, uploadFile } = useOrderPrintStore();
  const { setMobileOrderStep, setDesktopOrderStep } = useOrderWorkflowStore();

  const handleUploadDocument = useMemo(
    () => async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        await uploadFile(printingRequestId.id, event.target.files[0]);
        if (screenSize <= ScreenSize.MD) {
          setMobileOrderStep(0);
        } else {
          setDesktopOrderStep(0);
        }
      }
    },
    [screenSize, printingRequestId.id, setMobileOrderStep, setDesktopOrderStep, uploadFile]
  );

  return (
    <label
      htmlFor='dropzone-file'
      className='flex flex-col items-center w-full h-[148px] gap-4 p-4 lg:h-[190px] lg:p-7 border-2 border-blue/1 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'
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
        <span className='font-semibold h-8'>Allowed formats:</span> .doc, .docx, .xls, .xlsx, .ppt,
        .jpg, .png, .pdf
        <div className='text-sm lg:text-md h-4'>
          <span className='font-semibold'>Maximum size:</span> 100MB
        </div>
      </div>

      <input id='dropzone-file' type='file' className='hidden' onChange={handleUploadDocument} />
    </label>
  );
}
