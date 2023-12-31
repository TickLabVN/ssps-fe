import { MutableRefObject, useCallback, useMemo } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useCloseForm, FileBox, FileInfo, FormFooter } from '@components/order/common';
import { usePrintingRequestQuery, useListenEvent } from '@hooks';
import { useOrderPrintStore, useOrderWorkflowStore } from '@states';
import { formatFileSize } from '@utils';

export const OrderListForm: Component<{
  handleExistOrderForm: () => Promise<void>;
  initialTotalCost: MutableRefObject<number>;
}> = ({ handleExistOrderForm, initialTotalCost }) => {
  const {
    listFiles: { data: listFiles, isFetching, isError, refetch: refetchListFiles }
  } = usePrintingRequestQuery();

  const { totalCost, setTotalCost, setIsFileUploadSuccess, setIsOrderUpdate } =
    useOrderPrintStore();
  const { setMobileOrderStep, setDesktopOrderStep } = useOrderWorkflowStore();
  const { openCloseForm, CloseForm } = useCloseForm();

  const totalSize = useMemo(
    () => listFiles?.reduce((totalSize, file) => totalSize + file.fileSize, 0),
    [listFiles]
  );

  useListenEvent('listFiles:refetch', refetchListFiles);

  const handleExistCloseForm = useCallback(async () => {
    initialTotalCost.current = 0;
    setTotalCost(0);
    setIsFileUploadSuccess(false);
    setIsOrderUpdate(false);
    setMobileOrderStep({
      current: 0,
      prev: 2
    });
    setDesktopOrderStep(0);
    await handleExistOrderForm();
  }, [
    initialTotalCost,
    setIsFileUploadSuccess,
    setIsOrderUpdate,
    setTotalCost,
    setMobileOrderStep,
    setDesktopOrderStep,
    handleExistOrderForm
  ]);

  const handleSaveOrderUpdate = useCallback(() => {
    initialTotalCost.current = totalCost;
    setIsOrderUpdate(false);
    setMobileOrderStep({
      current: 3,
      prev: 2
    });
    setDesktopOrderStep(2);
  }, [initialTotalCost, totalCost, setIsOrderUpdate, setMobileOrderStep, setDesktopOrderStep]);

  return (
    <div>
      <div className='flex justify-between px-6 py-3 text-gray/4 shadow-md font-semibold bg-white'>
        <div className='flex items-center'>
          <ChevronLeftIcon className='cursor-pointer w-6 h-6' onClick={openCloseForm} />
          <span className='ml-4 font-bold'>Order list</span>
        </div>
        <CloseForm
          handleSave={handleSaveOrderUpdate}
          handleExist={handleExistCloseForm}
          listFilesLength={listFiles?.length}
        />
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
              listFiles.map((file, index) => (
                <div key={index} className='border-b-2'>
                  <FileInfo
                    fileExtraMetadata={file}
                    isConfigStep={false}
                    initialTotalCost={initialTotalCost}
                  />
                </div>
              ))
            ) : isError ? (
              <div className='grid justify-items-center items-center bg-gray-100'>
                <Typography variant='h6' color='red'>
                  Không thể tải danh sách các files trong đơn hàng.
                </Typography>
              </div>
            ) : (
              listFiles.map((file, index) => (
                <div key={index} className='border-b-2'>
                  <FileInfo
                    fileExtraMetadata={file}
                    isConfigStep={false}
                    initialTotalCost={initialTotalCost}
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
          <span className='text-base'>Order</span>
        </Button>
      </FormFooter>
    </div>
  );
};
