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
import portraitBottom from '../../assets/portrait-bottom.jpg';
import portraitTop from '../../assets/portrait-top.jpg';
import portraitLeft from '../../assets/portrait-left.jpg';
import portraitRight from '../../assets/portrait-right.jpg';
import landscapeBottom from '../../assets/landscape-bottom.jpg';
import landscapeTop from '../../assets/landscape-top.jpg';
import landscapeLeft from '../../assets/landscape-left.png';
import landscapeRight from '../../assets/landscape-right.jpg';
export const DialogForm: Component<{ layout: string; open: boolean; handleOpen: () => void }> = ({
  layout,
  open,
  handleOpen
}) => {
  return (
    <Dialog size='xs' open={open} handler={handleOpen}>
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
          <ListItem className='hover:bg-gray-900 hover:text-white' onClick={handleOpen}>
            <ListItemPrefix>
              <img src={layout === 'Portrait' ? portraitLeft : landscapeLeft} />
            </ListItemPrefix>
            <div>
              <Typography>{layout === 'Portrait' ? 'Long edge' : 'Short edge'}</Typography>
              <Typography>LEFT</Typography>
            </div>
          </ListItem>
          <ListItem className='hover:bg-gray-900 hover:text-white' onClick={handleOpen}>
            <ListItemPrefix>
              <img src={layout === 'Portrait' ? portraitRight : landscapeRight} />
            </ListItemPrefix>
            <div>
              <Typography>{layout === 'Portrait' ? 'Long edge' : 'Short edge'}</Typography>
              <Typography>RIGHT</Typography>
            </div>
          </ListItem>
          <ListItem className='hover:bg-gray-900 hover:text-white' onClick={handleOpen}>
            <ListItemPrefix className={layout === 'Portrait' ? 'px-2 bg-gray-200' : ''}>
              <img src={layout === 'Portrait' ? portraitTop : landscapeTop} />
            </ListItemPrefix>
            <div>
              <Typography>{layout === 'Portrait' ? 'Short edge' : 'Long edge'}</Typography>
              <Typography>TOP</Typography>
            </div>
          </ListItem>
          <ListItem className='hover:bg-gray-900 hover:text-white' onClick={handleOpen}>
            <ListItemPrefix className={layout === 'Portrait' ? 'px-2 bg-gray-200' : ''}>
              <img src={layout === 'Portrait' ? portraitBottom : landscapeBottom} />
            </ListItemPrefix>
            <div>
              <Typography>{layout === 'Portrait' ? 'Short edge' : 'Long edge'}</Typography>
              <Typography>BOTTOM</Typography>
            </div>
          </ListItem>
        </List>
      </DialogBody>
    </Dialog>
  );
};
