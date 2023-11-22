import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LAYOUT_SIDE, PAGES_SPECIFIC, PAGES_PER_SHEET, PAGE_SIDE } from '@constants';

export const useOrderPrintStore = create<PrintingRequestStore>()(
  devtools((set) => ({
    isFileUploadSuccess: false,
    fileConfig: {
      numOfCopies: 1,
      layout: LAYOUT_SIDE.portrait,
      pages: PAGES_SPECIFIC.all,
      pagesPerSheet: PAGES_PER_SHEET[0]!,
      pageSide: PAGE_SIDE.one
    },
    totalCost: 0,
    listFileAmount: [],
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
          numOfCopies: 1,
          layout: LAYOUT_SIDE.portrait,
          pages: PAGES_SPECIFIC.all,
          pagesPerSheet: PAGES_PER_SHEET[0]!,
          pageSide: PAGE_SIDE.one
        }
      });
    },
    setTotalCost: (totalCost) => {
      set({ totalCost: totalCost });
    },
    setListFileAmount: (payload) => {
      set((state) => {
        const existingIndex = state.listFileAmount.findIndex(
          (file) => file.fileId === payload.fileId
        );
        if (existingIndex !== -1) {
          const updatedListFileAmount = { ...state.listFileAmount[existingIndex], ...payload };
          const updatedListFileAmountArray = [...state.listFileAmount];
          updatedListFileAmountArray[existingIndex] = updatedListFileAmount;

          return { listFileAmount: updatedListFileAmountArray };
        }
        return { listFileAmount: [...state.listFileAmount, payload] };
      });
    }
  }))
);
