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
        <div className='relative'>
          <Dialog open={openBox} handler={handleOpenBox}>
            <DialogBody
              className='flex flex-col items-center justify-center gap-5 p-5 lg:p-10'
              onClick={() => {
                setOpenBox(false);
                openOrderWorkflowBox();
                setOrderStep(1);
              }}
            >
              <label
                htmlFor='dropzone-file'
                className='flex flex-col w-70 h-35 gap-3 p-4 lg:w-96 lg:h-47 lg:p-8 border-2 border-blue/1 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'
              >
                <div className='flex gap-4'>
                  <ArrowUpTrayIcon
                    strokeWidth={2}
                    className='bg-blue/1 text-white rounded-full w-10 h-10 p-2 lg:w-12 lg:h-12 lg:p-3'
                  />
                  <span className='justify-center text-xl lg:text-2xl text-blue/1 font-semibold h=10 p-1 lg:h-12 lg:p-2'>
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

                <input id='dropzone-file' type='file' className='hidden' />
              </label>
            </DialogBody>
          </Dialog>
          {<OrderWorkflowBox />}
        </div>
      </>
    );
  };

  return {
    openChooseFileBox: () => setOpenBox(true),
    ChooseFileBox: ChooseFileBox
  };
}
