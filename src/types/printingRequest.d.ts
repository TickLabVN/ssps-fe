type PrintingRequestId = {
  id: string;
};

type FileMetadata = {
  fileId: string;
  fileName: string;
  numPage: number;
  fileURL: string;
  fileSize: number;
  fileCoin: number;
};

type FileExtraMetadata = FileMetadata & { numOfCopies: number };

type FileLayout = 'portrait' | 'landscape';
type FilePages = 'all' | 'odd' | 'even' | string[];
type FilePagesPerSheet = '1' | '2' | '4' | '6' | '9' | '16';
type FilePageSide = 'one' | 'long' | 'short';

type FileConfig = {
  numOfCopies: number;
  layout: FileLayout;
  pages: FilePages;
  pagesPerSheet: FilePagesPerSheet;
  pageSide: FilePageSide;
};

type FileAmount = {
  fileId: string;
  numOfCopies: number;
};

type PrintingRequestStore = {
  isFileUploadSuccess: boolean;
  isOrderUpdate: boolean;
  fileConfig: FileConfig;
  specificPage: string;
  pageBothSide: string;
  totalCost: number;
  setIsFileUploadSuccess: (data: boolean) => void;
  setIsOrderUpdate: (data: boolean) => void;
  setFileConfig: (key: string, value: string | number) => void;
  clearFileConfig: () => void;
  setSpecificPage: (data: string) => void;
  setPageBothSide: (data: string) => void;
  clearSpecificPageAndPageBothSide: () => void;
  setTotalCost: (totalCost: number) => void;
};
