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

type FileConfig = {
  numOfCopies: number;
  layout: string;
  pages: string;
  pagesPerSheet: string;
  pageSide: string;
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
  listFileAmount: FileAmount[];
  setIsFileUploadSuccess: (data: boolean) => void;
  setIsOrderUpdate: (data: boolean) => void;
  setFileConfig: (key: string, value: string | number) => void;
  clearFileConfig: () => void;
  setSpecificPage: (data: string) => void;
  setPageBothSide: (data: string) => void;
  clearSpecificPageAndPageBothSide: () => void;
  setTotalCost: (totalCost: number) => void;
  setListFileAmount: (payload: FileAmount) => void;
  setArrayListFileAmount: (payload: FileAmount[]) => void;
  clearListFileAmount: () => void;
};
