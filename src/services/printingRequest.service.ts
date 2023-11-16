import { invoke, apiClient } from './common';

export const printingRequestService = {
  getPrintingRequest: () => invoke(apiClient.GET('/api/printRequest')),
  createPrintingRequest: () =>
    invoke(apiClient.POST('/api/printRequest', { headers: { 'Content-Type': 'text/plain' } })),
  uploadFile: (printingRequestId: string, file: File) =>
    invoke(
      apiClient.POST('/api/printRequest/{printingRequestId}/upload-file', {
        params: { path: { printingRequestId } },
        bodySerializer: () => {
          const formData = new FormData();
          formData.append('file', file);
          return formData;
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    ),
  uploadFileConfig: (fileId: string, fileConfig: FileConfig) =>
    invoke(
      apiClient.POST('/api/printRequest/upload-config/{fileId}', {
        params: { path: { fileId } },
        body: fileConfig
      })
    )
};
