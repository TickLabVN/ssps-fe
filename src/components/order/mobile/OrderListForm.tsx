import { MutableRefObject, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useCloseForm, FileBox, FormFooter } from '@components/order/common';
import { printingRequestService } from '@services';
import { useOrderPrintStore } from '@states';
import { formatFileSize, retryQueryFn } from '@utils';
import { FileInfo } from './FileInfo';

export const OrderListForm: Component<{
  handleExistOrderForm: () => void;
  initialTotalCost: MutableRefObject<number>;
}> = ({ initialTotalCost }) => {
  const queryClient = useQueryClient();
  const printingRequestId = queryClient.getQueryData<PrintingRequestId>(['printingRequestId']);
  const { data: listFiles } = useQuery({
    queryKey: ['/api/printRequest/{printingRequestId}/files', printingRequestId],
    queryFn: () =>
      printingRequestId
        ? printingRequestService.getListFilesByPrintingRequest(printingRequestId.id)
        : undefined,
    retry: retryQueryFn
  });

  const { totalCost } = useOrderPrintStore();
  const { openCloseForm } = useCloseForm();

  const totalSize = useMemo(
    () => listFiles?.reduce((totalSize, file) => totalSize + file.fileSize, 0),
    [listFiles]
  );

  //const { setMobileOrderStep } = useOrderWorkflowStore();

  return (
    <div>
      <div className='flex justify-between px-6 py-3 text-gray/4 shadow-md font-semibold bg-white'>
        <div className='flex items-center'>
          <ChevronLeftIcon className='cursor-pointer w-6 h-6' onClick={openCloseForm} />
          <span className='ml-4 font-bold'>Order list</span>
        </div>
        {/* <CloseForm handleSave={handleSaveFileConfig} handleExist={handleExistCloseForm} /> */}
        <div className='text-xs flex flex-col'>
          <span className='font-medium'>Size limit:</span>
          <div>
            <span>{`${totalSize && formatFileSize(totalSize)} / `}</span>
            <span className='text-gray/3 font-medium'>1GB</span>
          </div>
        </div>
      </div>
      {listFiles && listFiles.length > 0 ? (
        <div className='py-6'>
          <div className='p-4 bg-white'>
            <FileBox />
          </div>
          <div className='mt-4 bg-white'>
            {listFiles.map((file, index) => (
              <div key={index} className='p-4 flex gap-4 border-b-4'>
                <FileInfo
                  fileExtraMetadata={file}
                  isConfigStep={false}
                  fileIndex={index}
                  initialTotalCost={initialTotalCost}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='pt-12 px-4 pb-4'>
          <FileBox />
        </div>
      )}
      <FormFooter totalCost={totalCost}>
        <Button
          color={listFiles && listFiles.length > 0 ? 'blue' : 'gray'}
          className='rounded-none w-[30%]'
          // onClick={handleSaveFileConfig}
          disabled={!listFiles || listFiles.length === 0}
        >
          <span className='text-base'>Save</span>
        </Button>
      </FormFooter>
    </div>
  );
};
