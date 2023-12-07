import portraitTop from '@assets/portrait-top.jpg';
import portraitLeft from '@assets/portrait-left.jpg';
import landscapeTop from '@assets/landscape-top.jpg';
import landscapeLeft from '@assets/landscape-left.png';

export const LAYOUT_SIDE: Readonly<Record<FileLayout, FileLayout>> = Object.freeze({
  portrait: 'portrait',
  landscape: 'landscape'
});

export const LAYOUT_INFO = [
  {
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
        label: 'Long edge',
        value: 'long'
      },
      {
        label: 'Short edge',
        value: 'short'
      }
    ],
    landscape: [
      {
        label: 'Short edge',
        value: 'short'
      },
      {
        label: 'Long edge',
        value: 'long'
      }
    ]
  }
};
