import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { usePrintingRequestMutation } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';

export function FileBox() {
  const queryClient = useQueryClient();
  const { setIsFileUploadSuccess } = useOrderPrintStore();
  const { mobileOrderStep, setMobileOrderStep, setDesktopOrderStep } = useOrderWorkflowStore();
  const { uploadFile } = usePrintingRequestMutation();

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
        setMobileOrderStep({
          current: 0,
          prev: mobileOrderStep.current
        });
        setDesktopOrderStep(0);
      }
    },
    [
      mobileOrderStep,
      uploadFile,
      queryClient,
      setMobileOrderStep,
      setDesktopOrderStep,
      setIsFileUploadSuccess
    ]
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
        <span className='text-xl lg:text-2xl text-blue/1 font-semibold h-[40px] p-1 lg:h-[48px] lg:p-2 truncate'>
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
