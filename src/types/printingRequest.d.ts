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
  isFileUploadSuccess: boolean;
  fileConfig: FileConfig;
  totalCost: number;
  setIsFileUploadSuccess: (data: boolean) => void;
  setFileConfig: (key: string, value: string) => void;
  resetFileConfig: (fileConfig: FileConfig) => void;
  clearFileConfig: () => void;
  setTotalCost: (totalCost: number) => void;
};
