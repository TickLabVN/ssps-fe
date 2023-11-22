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

export const LAYOUT_INFO = [
  {
    pos: 'Left',
    portraitImage: portraitLeft,
    landscapeImage: landscapeLeft,
    portraitSize: 'Long edge',
    landscapeSize: 'Short edge'
  },
  {
    pos: 'Right',
    portraitImage: portraitRight,
    landscapeImage: landscapeRight,
    portraitSize: 'Long edge',
    landscapeSize: 'Short edge'
  },
  {
    pos: 'Top',
    portraitImage: portraitTop,
    landscapeImage: landscapeTop,
    portraitSize: 'Short edge',
    landscapeSize: 'Long edge'
  },
  {
    pos: 'Bottom',
    portraitImage: portraitBottom,
    landscapeImage: landscapeBottom,
    portraitSize: 'Short edge',
    landscapeSize: 'Long edge'
  }
];

export const FILE_CONFIG = {
  numOfCopies: 'numOfCopies',
  layout: 'layout',
  pages: 'pages',
  pagesPerSheet: 'pagesPerSheet',
  pageSide: 'pageSide'
};

export const PAGES_SPECIFIC = {
  all: 'All',
  odd: 'Odd pages only',
  even: 'Even pages only'
};

export const PAGES_PER_SHEET = ['1', '2', '4', '8', '16'];

export const PAGE_SIDE = {
  one: 'One side',
  both: {
    portrait: ['Long edge (Left)', 'Long edge (Right)', 'Short edge (Top)', 'Short edge (Bottom)'],
    landscape: ['Short edge (Left)', 'Short edge (Right)', 'Long edge (Top)', 'Long edge (Bottom)']
  }
};
