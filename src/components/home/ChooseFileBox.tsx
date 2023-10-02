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
            onClick={() => {
              setOpenBox(false);
              openOrderWorkflowBox();
              setOrderStep(1);
            }}
          >
            <div>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-62 h-35 gap-4 p-4 border-2 border-blue/1 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'
              >
                <div className='flex items-center justify-center gap-4 h-10'>
                  <ArrowUpTrayIcon
                    strokeWidth={2}
                    className='bg-blue/1 text-white rounded-full w-10 h-10 p-2 lg:w-10 lg:h-10 lg:p-3'
                  />
                  <span className='text-xl text-blue/1 font-semibold w-37 h-8'>
                    Choose file to print
                  </span>
                </div>

                <div className='lg: text-xs w-54 h-13 gap-1'>
                  <span className='font-semibold h-8'>Allowed formats:</span> .doc, .docx, .xls,
                  .xlsx, .ppt, .jpg, .png, .pdf
                  <div className='lg: text-xs h-4'>
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
