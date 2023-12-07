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
type FilePagesPerSheet = '1' | '2' | '4' | '6' | '9' | '16';
type FilePageSide = 'one' | 'long' | 'short';

type FileConfig = {
  numOfCopies: number;
  layout: FileLayout;
  pages: string;
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
  isOrderSuccess: boolean;
  fileConfig: FileConfig;
  specificPage: string;
  pageBothSide: string;
  totalCost: number;
  fileCoins: number;
  setIsFileUploadSuccess: (data: boolean) => void;
  setIsOrderUpdate: (data: boolean) => void;
  setIsOrderSuccess: (data: boolean) => void;
  setFileConfig: (key: string, value: string | number) => void;
  clearFileConfig: () => void;
  setSpecificPage: (data: string) => void;
  setPageBothSide: (data: string) => void;
  clearSpecificPageAndPageBothSide: () => void;
  setTotalCost: (totalCost: number) => void;
  setFileCoins: (fileCoins: number) => void;
};
