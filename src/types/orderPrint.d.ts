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

type PrintingRequestId = {
  id: string;
};

type OrderPrintStore = {
  printingRequestId: PrintingRequestId | null;
  updatePrintingRequestId: (id: PrintingRequestId) => void;
  fileMetadata: FileMetadata;
  fileConfig: FileConfig;
  totalCost: number;
  uploadFile: (printingRequestId: string, file: File) => Promise<void>;
  uploadConfigFile: (fileId: string, fileConfig: FileConfig) => Promise<void>;
  setFileConfig: (key: string, value: string) => void;
  resetFileConfig: (fileConfig: FileConfig) => void;
  clearFileConfig: () => void;
  setTotalCost: (totalCost: number) => void;
};
