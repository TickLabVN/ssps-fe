import React, { useCallback, useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Option,
  Radio,
  Select,
  Typography
} from '@material-tailwind/react';
import {
  ExclamationCircleIcon,
  EyeIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { useCloseForm, useLayoutSide, FormFooter } from '@components/order/common';
import { ORDER_STATUS, LAYOUT_SIDE } from '@constants';
import { useOrderStore, useFileStore } from '@states/home';
import { useOrderWorkflowStore, useOrderPrintStore } from '@states/order';
import { formatFileSize } from '@utils';

export const UploadDocumentForm: Component<{ handleExistOrderForm: () => void }> = ({
  handleExistOrderForm
}) => {
  const COINS_PER_DOC = 200;

  const [selectedLayout, setSelectedLayout] = useState<string>(LAYOUT_SIDE.portrait);
  const [numOfCopy, setNumOfCopy] = useState<number>(1);

  const { setMobileOrderStep } = useOrderWorkflowStore();
  const { openLayoutSide, LayoutSide } = useLayoutSide();
  const { totalCost, setOrderPrintList, setTotalCost } = useOrderPrintStore();
  const { orderData } = useOrderStore();
  const { fileTarget } = useFileStore();
  const { openCloseForm, CloseForm } = useCloseForm();

  const handleDecrease = () => {
    if (numOfCopy > 1) {
      setNumOfCopy(numOfCopy - 1);
    }
  };
  const handleIncrease = () => {
    setNumOfCopy(numOfCopy + 1);
  };
  const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLayout(e.target.value);
  };

  const handleSaveOrderPrintList = useCallback(() => {
    setOrderPrintList({
      status: ORDER_STATUS.ready,
      location: 'BK-B6',
      fileName: fileTarget.name,
      coins: COINS_PER_DOC * numOfCopy,
      size: fileTarget.size,
      number: numOfCopy,
      pageNumber: 20,
      paid: 'Not paid'
    });
    setTotalCost(totalCost + COINS_PER_DOC * numOfCopy);
  }, [fileTarget.name, fileTarget.size, numOfCopy, totalCost, setOrderPrintList, setTotalCost]);

  return (
    <>
      <div className='flex justify-between items-center shadow-md px-6 py-3 bg-white mb-6'>
        <span className='text-gray/4 font-bold'>Upload document</span>
        <IconButton variant='text' onClick={openCloseForm}>
          <XMarkIcon className='w-6 h-6' />
        </IconButton>
        <CloseForm handleSave={handleSaveOrderPrintList} handleExist={handleExistOrderForm} />
      </div>
      <div className='flex gap-4 px-4 py-2 bg-white '>
        <div
          className='text-white rounded-lg border-2 border-transparent shadow-lg bg-gray/3 flex flex-col items-center justify-center cursor-pointer'
          onClick={() => setMobileOrderStep(6)}
        >
          <EyeIcon width={20} />
          <span className='text-xs'>Preview</span>
        </div>
        <div className='w-full'>
          <div className='flex flex-col text-gray/4'>
            <div className='font-medium'>
              <span className='text-gray/4'>{fileTarget.name}</span>
              <span className='text-gray/3'>{`(${formatFileSize(fileTarget.size)})`}</span>
            </div>
            <div className='text-xs mb-5'>
              <div className='flex'>
                <img src={coinImage} alt='coin' className='grayscale w-6 h-6' />
                <span className='text-gray/4 font-normal'>
                  {COINS_PER_DOC} x {numOfCopy} copies ={' '}
                </span>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center '>
            <div className='flex border-2 '>
              <span
                className='p-0.5 border-r-2 flex items-center cursor-pointer'
                onClick={handleDecrease}
              >
                <MinusIcon width={20} />
              </span>
              {numOfCopy > 0 && <span className='py-0.5 px-6'>{numOfCopy}</span>}
              <span
                className='p-0.5 border-l-2 flex items-center cursor-pointer'
                onClick={handleIncrease}
              >
                <PlusIcon width={20} />
              </span>
            </div>
            <div className='flex gap-1'>
              <img src={coinImage} alt='coin' className='w-6 h-6' />
              <span className='text-yellow/1 font-bold'>{COINS_PER_DOC * numOfCopy}</span>
            </div>
          </div>
        </div>
      </div>
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
          onClick={handleSaveOrderPrintList}
          disabled={orderData.length === 0}
        >
          Save
        </Button>
      </FormFooter>
    </>
  );
};
