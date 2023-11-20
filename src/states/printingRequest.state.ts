import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LAYOUT_SIDE, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';

export const useOrderPrintStore = create<PrintingRequestStore>()(
  devtools((set) => ({
    isFileUploadSuccess: false,
    fileConfig: {
      numOfCopy: '1',
      layout: LAYOUT_SIDE.portrait,
      pages: PAGES_SPECIFIC.all,
      pagesPerSheet: PAGES_PER_SHEET[0]!,
      pageSide: PAGE_SIDE.one
    },
    totalCost: 0,
    setIsFileUploadSuccess: (data) => {
      set({ isFileUploadSuccess: data });
    },
    setFileConfig: (key, value) => {
      set((state) => ({ fileConfig: { ...state.fileConfig, [key]: value } }));
    },
    resetFileConfig: (fileConfig) => {
      set({ fileConfig: fileConfig });
    },
    clearFileConfig: () => {
      set({
        fileConfig: {
          numOfCopy: '1',
          layout: LAYOUT_SIDE.portrait,
          pages: PAGES_SPECIFIC.all,
          pagesPerSheet: PAGES_PER_SHEET[0]!,
          pageSide: PAGE_SIDE.one
        }
      });
    },
    setTotalCost: (totalCost) => {
      set({ totalCost: totalCost });
    }
  }))
);
