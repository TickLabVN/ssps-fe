import { MutableRefObject, useCallback, useMemo } from 'react';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useCloseForm, FileBox, FileInfo, FormFooter } from '@components/order/common';
import { usePrintingRequestMutation, usePrintingRequestQuery, useListenEvent } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export const OrderListForm: Component<{
  handleExistOrderForm: () => Promise<void>;
  initialTotalCost: MutableRefObject<number>;
}> = ({ handleExistOrderForm, initialTotalCost }) => {
  const { updateAmountFiles } = usePrintingRequestMutation();
  const {
    listFiles: { data: listFiles, isFetching, isError, refetch: refetchListFiles }
  } = usePrintingRequestQuery();

  const {
    totalCost,
    listFileAmount,
    clearListFileAmount,
    setTotalCost,
    setIsFileUploadSuccess,
    setIsOrderUpdate
  } = useOrderPrintStore();
  const { setMobileOrderStep } = useOrderWorkflowStore();
  const { openCloseForm, CloseForm } = useCloseForm();

  const totalSize = useMemo(
    () => listFiles?.reduce((totalSize, file) => totalSize + file.fileSize, 0),
    [listFiles]
  );

  useListenEvent('listFiles:refetch', clearListFileAmount);
  useListenEvent('listFiles:refetch', refetchListFiles);

  const handleExistCloseForm = useCallback(async () => {
    initialTotalCost.current = 0;
    setTotalCost(0);
    setIsFileUploadSuccess(false);
    setIsOrderUpdate(false);
    clearListFileAmount();
    await handleExistOrderForm();
  }, [
    initialTotalCost,
    setIsFileUploadSuccess,
    setIsOrderUpdate,
    setTotalCost,
    clearListFileAmount,
    handleExistOrderForm
  ]);

  const handleSaveOrderUpdate = useCallback(async () => {
    await updateAmountFiles.mutateAsync(listFileAmount);
    initialTotalCost.current = totalCost;
    setIsOrderUpdate(false);
    setMobileOrderStep({
      current: 3,
      prev: 2
    });
  }, [
    totalCost,
    listFileAmount,
    initialTotalCost,
    updateAmountFiles,
    setMobileOrderStep,
    setIsOrderUpdate
  ]);

  return (
    <div>
      <div className='flex justify-between px-6 py-3 text-gray/4 shadow-md font-semibold bg-white'>
        <div className='flex items-center'>
          <ChevronLeftIcon className='cursor-pointer w-6 h-6' onClick={openCloseForm} />
          <span className='ml-4 font-bold'>Order list</span>
        </div>
        <CloseForm handleSave={handleSaveOrderUpdate} handleExist={handleExistCloseForm} />
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
            {isFetching ? (
              <div className='grid justify-items-center items-center bg-gray-100'>
                <Spinner color='green' className='h-12 w-12' />
              </div>
            ) : isError ? (
              <div className='grid justify-items-center items-center bg-gray-100'>
                <Typography variant='h6'>
                  Không thể tải danh sách các files trong đơn hàng.
                </Typography>
              </div>
            ) : (
              listFiles.map((file, index) => (
                <div key={index}>
                  <FileInfo
                    fileExtraMetadata={file}
                    isConfigStep={false}
                    fileIndex={index}
                    initialTotalCost={initialTotalCost}
                    updateAmountFiles={(listFileAmount: FileAmount[]) =>
                      updateAmountFiles.mutateAsync(listFileAmount)
                    }
                  />
                </div>
              ))
            )}
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
          onClick={handleSaveOrderUpdate}
          disabled={!listFiles || listFiles.length === 0}
        >
          <span className='text-base'>Save</span>
        </Button>
      </FormFooter>
    </div>
  );
};
