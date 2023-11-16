type PrintingRequestId = {
  id: string;
};

type FileMetadata = {
  fileId: string;
  fileName: string;
  numPage: string;
  fileURL: string;
  fileSize: number;
  fileCoin: number;
};

type FileConfig = {
  numOfCopy: string;
  layout: string;
  pages: string;
  pagesPerSheet: string;
  pageSide: string;
};

type PrintingRequestStore = {
  fileConfig: FileConfig;
  totalCost: number;
  setFileConfig: (key: string, value: string) => void;
  resetFileConfig: (fileConfig: FileConfig) => void;
  clearFileConfig: () => void;
  setTotalCost: (totalCost: number) => void;
};
