import { useMemo, useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Radio,
  Select
} from '@material-tailwind/react';
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import coinImage from '@assets/coin.png';
import { useLayoutSide, FormFooter } from '@components/order/common';
import { LAYOUT_SIDE, ORDER_STATUS } from '@constants';
import { useFileStore } from '@states/home';
import { useOrderPrintStore } from '@states/order';
import { formatFileSize } from '@utils';

export function useUploadAndPreviewDocBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { fileTarget } = useFileStore();

  const PreviewDocument = () =>
    useMemo(() => {
      if (fileTarget.url) {
        return (
          <DocViewer
            config={{
              header: {
                disableFileName: true
              },
              pdfVerticalScrollByDefault: true
            }}
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: fileTarget.url }]}
          />
        );
      } else return null;
    }, []);

  const UploadAndPreviewDocBox = () => {
    const COINS_PER_DOC = 200;

    const [numOfCopy, setNumOfCopy] = useState<number>(1);
    const [selectedLayout, setSelectedLayout] = useState<string>(LAYOUT_SIDE.portrait);
    const { openLayoutSide, LayoutSide } = useLayoutSide();
    const { totalCost, setTotalCost, setOrderPrintList } = useOrderPrintStore();

    const handleOpenDialog = () => setOpenDialog(!openDialog);
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
    const handleSaveOrderPrintList = () => {
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
    };

    return (
      <Dialog size='xl' open={openDialog} handler={handleOpenDialog}>
        <DialogHeader className='justify-end p-0 bg-gray-200 rounded-t-md'>
          <IconButton variant='text' onClick={() => setOpenDialog(false)}>
            <XMarkIcon className='w-6 h-6' />
          </IconButton>
        </DialogHeader>
        <DialogBody className='grid grid-cols-3 gap-4 bg-gray-200 p-0'>
          <div className='flex flex-col bg-white'>
            <div className='h-[30rem] overflow-y-auto'>
              <div className='flex flex-col gap-4 p-4 border-b-2'>
                <div>
                  <span className='text-gray/4 text-xl font-bold'>Upload document</span>
                  <p className='flex items-center gap-2 font-medium text-lg'>
                    <span className='text-gray/4'>{fileTarget.name}</span>
                    <span className='text-gray/3'>{`(${formatFileSize(fileTarget.size)})`}</span>
                  </p>
                  <p className='flex items-center gap-1 text-base'>
                    <img src={coinImage} className='grayscale w-6 h-6' />
                    <span className='text-gray/4 font-normal'>
                      {COINS_PER_DOC} x {numOfCopy} copies ={' '}
                    </span>
                    <img src={coinImage} className='w-6 h-6' />
                    <span className='text-yellow/1 font-bold'>{COINS_PER_DOC * numOfCopy}</span>
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
              <div className='flex flex-col gap-4 p-4 text-gray/4 bg-white'>
                <div>
                  <span className='text-xl font-bold'>Layout</span>
                  <div className='flex flex-col -ml-3'>
                    <Radio
                      name='layout'
                      label={LAYOUT_SIDE.portrait}
                      value={LAYOUT_SIDE.portrait}
                      onChange={handleLayoutChange}
                      checked={selectedLayout === LAYOUT_SIDE.portrait}
                      crossOrigin=''
                    />
                    <Radio
                      name='layout'
                      label={LAYOUT_SIDE.landscape}
                      value={LAYOUT_SIDE.landscape}
                      onChange={handleLayoutChange}
                      checked={selectedLayout === LAYOUT_SIDE.landscape}
                      crossOrigin=''
                    />
                  </div>
                </div>
                <div>
                  <span className='text-xl font-bold'>Pages</span>
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
                <div>
                  <span className='text-xl font-bold mb-4'>Pages per sheet</span>
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
                  <span className='font-bold text-xl'>Page Side</span>
                  <div className='-ml-3'>
                    <Radio name='side' label='One side' crossOrigin='' />
                    <div className='flex items-center gap-4'>
                      <Radio
                        name='side'
                        crossOrigin=''
                        defaultChecked
                        label={
                          selectedLayout === LAYOUT_SIDE.portrait ? (
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
                      <ExclamationCircleIcon
                        className='w-6 h-6 cursor-pointer text-gray-500 hover:text-black'
                        onClick={openLayoutSide}
                      />
                      <LayoutSide layout={selectedLayout} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FormFooter totalCost={totalCost + COINS_PER_DOC * numOfCopy}>
              <Button
                color={fileTarget.size > 0 ? 'blue' : 'gray'}
                className='rounded-none w-[30%]'
                onClick={handleSaveOrderPrintList}
                disabled={fileTarget.size === 0}
              >
                <span className='text-base'>Save</span>
              </Button>
            </FormFooter>
          </div>
          <div className='h-[34rem] overflow-y-auto col-span-2'>{<PreviewDocument />}</div>
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openUploadAndPreviewDocBox: () => setOpenDialog(true),
    UploadAndPreviewDocBox: UploadAndPreviewDocBox
  };
}
