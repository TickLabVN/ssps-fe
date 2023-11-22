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
  fileConfig: FileConfig;
  totalCost: number;
  listFileAmount: FileAmount[];
  setIsFileUploadSuccess: (data: boolean) => void;
  setFileConfig: (key: string, value: string | number) => void;
  clearFileConfig: () => void;
  setTotalCost: (totalCost: number) => void;
  setListFileAmount: (payload: FileAmount) => void;
};
