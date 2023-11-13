type FileData = {
  name: string;
  url: string;
  size: number;
};

type FileStore = {
  fileStatus: StoreStatus;
  fileAll: FileData[];
  fileTarget: FileData;
  uploadFile: (file: File) => Promise<void>;
  getAllFiles: () => Promise<void>;
  getFileByName: (name: string) => FileData;
};
