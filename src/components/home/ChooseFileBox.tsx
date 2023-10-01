import { useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useOrderWorkflowBox } from '@components/order';
import { useOrderWorkflowStore } from '@states/order';

// Loc's task in here.
// This hook is used in ./src/pages/HomePage.tsx.

export function useChooseFileBox() {
  const { openOrderWorkflowBox, OrderWorkflowBox } = useOrderWorkflowBox();
  const [openBox, setOpenBox] = useState<boolean>(false);

  const ChooseFileBox = () => {
    const { setOrderStep } = useOrderWorkflowStore();
    const handleOpenBox = () => setOpenBox(!openBox);

    return (
      <>
        <Dialog open={openBox} handler={handleOpenBox}>
          <DialogBody
            className='bg-white dark:bg-black/1 rounded-lg shadow-lg'
            onClick={() => {
              setOpenBox(false);
              openOrderWorkflowBox();
              setOrderStep(1);
            }}
          >
            <div>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-40 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-blue-600 dark:bg-blue-650 hover:bg-blue-100 dark:border-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-600'
              >
                <div className='flex items-center justify-cente gap-4 mb-4'>
                  <ArrowUpTrayIcon
                    strokeWidth={2}
                    className='bg-blue/1 text-white rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 lg:p-3'
                  />
                  <span className='text-xl text-blue/1 dark:text-blue/1 font-semibold'>
                    Choose file to print
                  </span>
                </div>

                <div>
                  <div className='text-xs text-black/1 dark:text-black/1'>
                    <span className='font-semibold lg: text-md'>Allowed formats:</span> .doc, .docx,
                    .xls, .xlsx, .ppt;
                  </div>

                  <div className='text-xs text-black/1 dark:text-black/1'>.jpg, .png, .pdf</div>

                  <div className='text-xs text-black/1 dark:text-black/1'>
                    <span className='font-semibold'>Maximum size:</span> 100MB
                  </div>
                </div>

                <input id='dropzone-file' type='file' className='hidden' />
              </label>
            </div>
          </DialogBody>
        </Dialog>
        {<OrderWorkflowBox />}
      </>
    );
  };

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
