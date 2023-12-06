import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LAYOUT_SIDE, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';

export const useOrderPrintStore = create<PrintingRequestStore>()(
  devtools((set) => ({
    isFileUploadSuccess: false,
    isOrderUpdate: false,
    fileConfig: {
      numOfCopies: 1,
      layout: LAYOUT_SIDE.portrait,
      pages: 'all',
      pagesPerSheet: PAGES_PER_SHEET[0]!,
      pageSide: 'one'
    },
    specificPage: '',
    pageBothSide: PAGE_SIDE.both.portrait[0]!.value,
    totalCost: 0,
    fileCoins: 0,
    setIsFileUploadSuccess: (data) => {
      set({ isFileUploadSuccess: data });
    },
    setIsOrderUpdate: (data) => {
      set({ isOrderUpdate: data });
    },
    setFileConfig: (key, value) => {
      set((state) => ({ fileConfig: { ...state.fileConfig, [key]: value } }));
    },
    clearFileConfig: () => {
      set({
        fileConfig: {
          numOfCopies: 1,
          layout: LAYOUT_SIDE.portrait,
          pages: 'all',
          pagesPerSheet: PAGES_PER_SHEET[0]!,
          pageSide: 'one'
        }
      });
    },
    setSpecificPage: (data) => {
      set({ specificPage: data });
    },
    setPageBothSide: (data) => {
      set({ pageBothSide: data });
    },
    clearSpecificPageAndPageBothSide: () => {
      set({ specificPage: '', pageBothSide: PAGE_SIDE.both.portrait[0]!.value });
    },
    setTotalCost: (totalCost) => {
      set({ totalCost: totalCost });
    },
    setFileCoins: (fileCoins) => {
      set({ fileCoins: fileCoins });
    }
  }))
);
