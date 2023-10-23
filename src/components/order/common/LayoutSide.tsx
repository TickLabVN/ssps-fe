import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from '@material-tailwind/react';
import { LAYOUT_INFO, LAYOUT_SIDE, LAYOUT_SIZE } from '@constants';

export const useLayoutSide = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const LayoutSide: Component<{ layout: string }> = useMemo(
    () =>
      ({ layout }) => {
        const handleOpen = () => {
          setOpenDialog(!openDialog);
        };

        return (
          <Dialog size='xs' open={openDialog} handler={handleOpen}>
            <DialogHeader className='justify-between'>
              <div className='font-medium text-gray/4 text-base'>
                <span className='mr-2 font-bold'>Both side</span>
                <span className='mr-2'>-</span>
                <span>{layout}</span>
              </div>
              <IconButton color='blue-gray' size='sm' variant='text' onClick={handleOpen}>
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
            <DialogBody>
              <List>
                {LAYOUT_INFO.map((item, index) => (
                  <ListItem
                    key={index}
                    className='hover:bg-gray-900 hover:text-white'
                    onClick={handleOpen}
                  >
                    <ListItemPrefix
                      className={
                        index > 1 && layout === LAYOUT_SIDE.portrait ? 'px-2 bg-gray-200' : ''
                      }
                    >
                      <img
                        src={
                          layout === LAYOUT_SIDE.portrait ? item.portraitImage : item.landscapeImage
                        }
                      />
                    </ListItemPrefix>
                    <div>
                      <Typography>
                        {layout === LAYOUT_SIDE.portrait ? LAYOUT_SIZE.long : LAYOUT_SIZE.short}
                      </Typography>
                      <Typography>{item.pos}</Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
            </DialogBody>
          </Dialog>
        );
      },
    [openDialog]
  );

  return {
    openLayoutSide: () => setOpenDialog(true),
    LayoutSide: LayoutSide
  };
};
