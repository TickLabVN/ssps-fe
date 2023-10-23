import portraitBottom from '@assets/portrait-bottom.jpg';
import portraitTop from '@assets/portrait-top.jpg';
import portraitLeft from '@assets/portrait-left.jpg';
import portraitRight from '@assets/portrait-right.jpg';
import landscapeBottom from '@assets/landscape-bottom.jpg';
import landscapeTop from '@assets/landscape-top.jpg';
import landscapeLeft from '@assets/landscape-left.png';
import landscapeRight from '@assets/landscape-right.jpg';

export const LAYOUT_SIDE = {
  portrait: 'Portrait',
  landscape: 'Landscape'
};

export const LAYOUT_SIZE = {
  long: 'Long edge',
  short: 'Short edge'
};

export const LAYOUT_INFO = [
  {
    pos: 'left',
    portraitImage: portraitLeft,
    landscapeImage: landscapeLeft
  },
  {
    pos: 'right',
    portraitImage: portraitRight,
    landscapeImage: landscapeRight
  },
  {
    pos: 'top',
    portraitImage: portraitTop,
    landscapeImage: landscapeTop
  },
  {
    pos: 'bottom',
    portraitImage: portraitBottom,
    landscapeImage: landscapeBottom
  }
];
