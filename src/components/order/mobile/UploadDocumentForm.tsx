import React, { useState } from 'react';
import {
  Button,
  Radio,
  Typography,
  Input,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton
} from '@material-tailwind/react';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useLayoutSide, FormFooter } from '@components/order/common';
import { UploadDocumentItem } from '@components/order/mobile';
import { useOrderStore } from '@states/home';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states/order';

// Tan's first-task in here.
export function UploadDocumentForm() {
  const { openLayoutSide, LayoutSide } = useLayoutSide();

  const [openXDialog, setOpenXDialog] = useState<boolean>(false);
  //const { orderPrintList, setOrderPrintList } = useOrderPrintStore();
  const handleOpenX = () => {
    setOpenXDialog(!openXDialog);
  };
  const { orderData } = useOrderStore();
  const { setMobileOrderStep } = useOrderWorkflowStore();

  const { totalCost } = useOrderPrintStore();
  const [selectedLayout, setSelectedLayout] = useState<string>('Portrait');
  const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLayout(e.target.value);
  };
  const handleSave = () => {
    // const newOrderPrintItem = {
    //   id: '1278-cfdb',
    //   status: 'ready',
    //   location: 'aaa',
    //   fileName: 'showMaker.txt',
    //   coins: 50,
    //   size: 50,
    //   number: 50,
    //   pageNumber: 20,
    //   paid: 'Not paid'
    // };
    //const newOrderPrintList = [...orderPrintList, newOrderPrintItem];
    //setOrderPrintList(newOrderPrintList);
    setMobileOrderStep(2);
  };
  return (
    <>
      <div className='flex justify-between shadow-md px-6 py-3 bg-white mb-6'>
        <span className='text-gray/4 font-bold'>Upload document</span>
        <XMarkIcon width={28} onClick={handleOpenX} />
        <Dialog open={openXDialog} handler={handleOpenX}>
          <DialogHeader className='justify-end py-2'>
            <IconButton color='blue-gray' size='sm' variant='text' onClick={handleOpenX}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </IconButton>
          </DialogHeader>
          <DialogBody className='px-[50px] py-2'>
            <Typography variant='h4' color='black'>
              Do you want to save your changes?
            </Typography>
            <Typography variant='h6'>Your changes will be lost if you don't save them</Typography>
            <div className='flex gap-5 mt-4'>
              <Button className='bg-green-200' onClick={handleSave}>
                Save changes
              </Button>
              <Button onClick={() => setMobileOrderStep(2)}>Don't save</Button>
            </div>
          </DialogBody>
        </Dialog>
      </div>
      {/* {<FileBox />} */}
      <UploadDocumentItem fileName='showMaker.txt' coins={50} size={50} numberItem={50} />
      <div className='p-6 text-gray/4 bg-white mt-4'>
        <div className='mb-8'>
          <Typography className='font-bold'>Layout</Typography>
          <div className='flex flex-col -ml-3'>
            <Radio
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
            />
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
              <Radio
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
              />
              ''
              <ExclamationCircleIcon
                width={24}
                className='ml-6 cursor-pointer text-gray-300 hover:text-black'
                onClick={openLayoutSide}
              />
              <LayoutSide layout={selectedLayout} />
            </div>
          </div>
        </div>
      </div>
      <FormFooter totalCost={totalCost}>
        <Button
          color={orderData.length > 0 ? 'blue' : 'gray'}
          className='rounded-none w-[30%]'
          onClick={() => {
            handleSave();
          }}
          disabled={orderData.length === 0}
        >
          Save
        </Button>
      </FormFooter>
    </>
  );
}
