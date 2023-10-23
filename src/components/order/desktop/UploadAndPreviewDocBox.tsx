import { useState } from 'react';
import {
  Dialog,
  DialogBody,
  Input,
  Option,
  Radio,
  Select,
  Typography
} from '@material-tailwind/react';
import { ExclamationCircleIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import coinImage from '@assets/coin.png';
import { useFileStore } from '@states/home';
import { formatFileSize } from '@utils';

export function useUploadAndPreviewDocBox() {
  const { fileTarget } = useFileStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const UploadAndPreviewDocBox = () => {
    const [numOfCopy, setNumOfCopy] = useState<number>(1);

    const handleOpenDialog = () => setOpenDialog(!openDialog);
    const handleDecrease = () => {
      if (numOfCopy > 1) {
        setNumOfCopy(numOfCopy - 1);
      }
    };
    const handleIncrease = () => {
      setNumOfCopy(numOfCopy + 1);
    };

    return (
      <Dialog size='xl' open={openDialog} handler={handleOpenDialog}>
        <DialogBody className='grid grid-cols-3'>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-4 p-4 border-b-2'>
              <div>
                <span className='text-gray/4 text-2xl font-bold'>Upload document</span>
                <p className='flex items-center gap-2 font-medium text-xl'>
                  <span className='text-gray/4'>{fileTarget.name}</span>
                  <span className='text-gray/3'>{`(${formatFileSize(fileTarget.size)})`}</span>
                </p>
                <p className='flex items-center gap-1 text-lg'>
                  <img src={coinImage} className='grayscale w-6 h-6' />
                  <span className='text-gray/4 font-normal'>200 x {numOfCopy} copies = </span>
                  <img src={coinImage} className='w-6 h-6' />
                  <span className='text-yellow/1 font-bold'>{200 * numOfCopy}</span>
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex border-2'>
                  <span
                    className='p-0.5 border-r-2 flex items-center cursor-pointer'
                    onClick={handleDecrease}
                  >
                    <MinusIcon className='w-5 h-5' />
                  </span>
                  {numOfCopy > 0 && <span className='py-0.5 px-6'>{numOfCopy}</span>}
                  <span
                    className='p-0.5 border-l-2 flex items-center cursor-pointer'
                    onClick={handleIncrease}
                  >
                    <PlusIcon className='w-5 h-5' />
                  </span>
                </div>
                <TrashIcon className='w-7 h-7' />
              </div>
            </div>
            <div className='p-6 text-gray/4 bg-white mt-4'>
              <div className='mb-8'>
                <Typography className='font-bold'>Layout</Typography>
                <div className='flex flex-col -ml-3'>
                  {/* <Radio
                    name='layout'
                    label='Portrait'
                    value='Portrait'
                    onChange={handleLayoutChange}
                    checked={selectedLayout === 'Portrait'}
                    crossOrigin=''
                    defaultChecked
                  />
                  <Radio
                    name='layout'
                    label='Landscape'
                    value='Landscape'
                    crossOrigin=''
                    onChange={handleLayoutChange}
                    checked={selectedLayout === 'Landscape'}
                  /> */}
                </div>
              </div>
              <div className='mb-8'>
                <Typography className='font-bold'>Pages</Typography>
                <div className='flex flex-col -ml-3'>
                  <Radio name='pages' label='All' crossOrigin='' defaultChecked />
                  <Radio name='pages' label='Odd pages only' crossOrigin='' />
                  <Radio name='pages' label='Even pages only' crossOrigin='' />
                  <Radio
                    name='pages'
                    label={<Input label='Specific Pages' crossOrigin='' />}
                    crossOrigin=''
                  />
                </div>
              </div>
              <div className='mb-8'>
                <Typography className='font-bold mb-4'>Pages per sheet</Typography>
                <Select label='Select an option'>
                  {['1', '2', '4', '8', '16'].map((item) => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <Typography className='font-bold'>Page Side</Typography>
                <div className='-ml-3'>
                  <Radio name='side' label='One side' crossOrigin='' />
                  <div className='flex'>
                    {/* <Radio
                      name='side'
                      crossOrigin=''
                      defaultChecked
                      label={
                        selectedLayout === 'Portrait' ? (
                          <Select label='Both sides'>
                            <Option>Long edge (Left)</Option>
                            <Option>Long edge (Right)</Option>
                            <Option>Short edge (Top)</Option>
                            <Option>Short edge (Bottom)</Option>
                          </Select>
                        ) : (
                          <Select label='Both sides'>
                            <Option>Short edge (Left)</Option>
                            <Option>Short edge (Right)</Option>
                            <Option>Long edge (Top)</Option>
                            <Option>Long edge (Bottom)</Option>
                          </Select>
                        )
                      }
                    /> */}
                    ''
                    <ExclamationCircleIcon
                      width={24}
                      className='ml-6 cursor-pointer text-gray-300 hover:text-black'
                      // onClick={handleOpen}
                    />
                    {/* <DialogForm layout={selectedLayout} open={open} handleOpen={handleOpen} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>B</div>
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openUploadAndPreviewDocBox: () => setOpenDialog(true),
    UploadAndPreviewDocBox: UploadAndPreviewDocBox
  };
}
