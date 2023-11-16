import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LAYOUT_SIDE, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';
import { orderPrintService } from '@services';

export const useOrderPrintStore = create<OrderPrintStore>()(
  devtools((set) => ({
    printingRequestId: null,
    fileMetadata: {
      fileId: '',
      fileName: '',
      numPage: '',
      fileURL: '',
      fileSize: 0,
      fileCoin: 0
    },
    fileConfig: {
      numOfCopy: '1',
      layout: LAYOUT_SIDE.portrait,
      pages: PAGES_SPECIFIC.all,
      pagesPerSheet: PAGES_PER_SHEET[0],
      pageSide: PAGE_SIDE.one
    },
    totalCost: 0,
    updatePrintingRequestId: (id) => {
      set({ printingRequestId: id });
    },
    createPrintingRequest: async () => {
      try {
        const printingRequestId = await orderPrintService.createPrintingRequest();
        set({ printingRequestId: printingRequestId });
      } catch (err) {
        throw err;
      }
    },
    uploadFile: async (printingRequestId, file) => {
      try {
        const fileMetatdata = await orderPrintService.uploadFile(printingRequestId, file);
        set({ fileMetadata: fileMetatdata });
      } catch (err) {
        throw err;
      }
    },
    uploadConfigFile: async (fileId, fileConfig) => {
      try {
        await orderPrintService.uploadConfigFile(fileId, fileConfig);
      } catch (err) {
        throw err;
      }
    },
    setFileConfig: (key, value) => {
      set((state) => ({ fileConfig: { ...state.fileConfig, [key]: value } }));
    },
    resetFileConfig: (fileConfig) => {
      set(() => ({ fileConfig: fileConfig }));
    },
    clearFileConfig: () => {
      set({
        fileConfig: {
          numOfCopy: '1',
          layout: LAYOUT_SIDE.portrait,
          pages: PAGES_SPECIFIC.all,
          pagesPerSheet: PAGES_PER_SHEET[0],
          pageSide: PAGE_SIDE.one
        }
      });
    },
    setTotalCost: (totalCost) => {
      set({ totalCost: totalCost });
    }
  }))
);
