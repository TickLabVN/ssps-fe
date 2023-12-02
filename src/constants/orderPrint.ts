import portraitBottom from '@assets/portrait-bottom.jpg';
import portraitTop from '@assets/portrait-top.jpg';
import portraitLeft from '@assets/portrait-left.jpg';
import portraitRight from '@assets/portrait-right.jpg';
import landscapeBottom from '@assets/landscape-bottom.jpg';
import landscapeTop from '@assets/landscape-top.jpg';
import landscapeLeft from '@assets/landscape-left.png';
import landscapeRight from '@assets/landscape-right.jpg';

export const LAYOUT_SIDE: Readonly<Record<FileLayout, FileLayout>> = Object.freeze({
  portrait: 'portrait',
  landscape: 'landscape'
});

export const LAYOUT_INFO = [
  {
    pos: 'Left',
    portraitImage: portraitLeft,
    landscapeImage: landscapeLeft,
    portraitSize: {
      label: 'Long edge',
      value: 'long'
    },
    landscapeSize: {
      label: 'Short edge',
      value: 'short'
    }
  },
  {
    pos: 'Right',
    portraitImage: portraitRight,
    landscapeImage: landscapeRight,
    portraitSize: {
      label: 'Long edge',
      value: 'long'
    },
    landscapeSize: {
      label: 'Short edge',
      value: 'short'
    }
  },
  {
    pos: 'Top',
    portraitImage: portraitTop,
    landscapeImage: landscapeTop,
    portraitSize: {
      label: 'Short edge',
      value: 'short'
    },
    landscapeSize: {
      label: 'Long edge',
      value: 'long'
    }
  },
  {
    pos: 'Bottom',
    portraitImage: portraitBottom,
    landscapeImage: landscapeBottom,
    portraitSize: {
      label: 'Short edge',
      value: 'short'
    },
    landscapeSize: {
      label: 'Long edge',
      value: 'long'
    }
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
  all: 'all',
  odd: 'odd',
  even: 'even'
};

export const PAGES_PER_SHEET: ReadonlyArray<FilePagesPerSheet> = Object.freeze([
  '1',
  '2',
  '4',
  '6',
  '9',
  '16'
]);

export const PAGE_SIDE = {
  one: 'one',
  both: {
    portrait: [
      {
        label: 'Long edge (Left)',
        value: 'long'
      },
      {
        label: 'Long edge (Right)',
        value: 'long'
      },
      {
        label: 'Short edge (Top)',
        value: 'short'
      },
      {
        label: 'Short edge (Bottom)',
        value: 'short'
      }
    ],
    landscape: [
      {
        label: 'Short edge (Left)',
        value: 'short'
      },
      {
        label: 'Short edge (Right)',
        value: 'short'
      },
      {
        label: 'Long edge (Top)',
        value: 'long'
      },
      {
        label: 'Long edge (Bottom)',
        value: 'long'
      }
    ]
  }
};
