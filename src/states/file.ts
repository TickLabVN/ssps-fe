import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FILE_NOT_FOUND } from '@constants';
import { fileService } from '@services';

export const useFileStore = create<FileStore>()(
  devtools((set, get) => ({
    fileStatus: 'UNINIT',
    fileAll: [],
    fileTarget: {
      name: '',
      url: '',
      size: 0
    },
    uploadFile: async (file) => {
      set(() => ({ fileStatus: 'PENDING' }));
      try {
        await fileService.upload(file);
        await get().getAllFiles();
        const fileTarget = get().getFileByName(file.name);
        set(() => ({ fileTarget: fileTarget, fileStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ fileStatus: 'REJECT' }));
      }
    },
    getAllFiles: async () => {
      set(() => ({ fileStatus: 'PENDING' }));
      try {
        const fileAll = await fileService.getAll();
        set(() => ({ fileAll: fileAll, fileStatus: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ fileStatus: 'REJECT' }));
      }
    },
    getFileByName: (name) => {
      const file = get().fileAll.find((item) => item.name === name);
      if (!file) throw new Error(FILE_NOT_FOUND);
      return file;
    }
  }))
);
