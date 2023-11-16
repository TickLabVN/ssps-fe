import { invoke, apiClient } from './common';

export const orderPrintService = {
  createPrintingRequest: () => invoke(apiClient.POST('/api/printRequest')),
  uploadFile: (printingRequestId: string, file: File) =>
    invoke(
      apiClient.POST('/api/printRequest/{printingRequestId}/upload-file', {
        params: { path: { printingRequestId } },
        bodySerializer: () => {
          const formData = new FormData();
          formData.append('file', file);
          return formData;
        }
      })
    ),
  uploadConfigFile: (fileId: string, fileConfig: FileConfig) =>
    invoke(
      apiClient.POST('/api/printRequest/upload-config/{fileId}', {
        params: { path: { fileId } },
        body: fileConfig
      })
    )
};
