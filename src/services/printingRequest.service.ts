import { invoke, apiClient } from './common';

export const printingRequestService = {
  getPrintingRequest: () => invoke(apiClient.GET('/api/printRequest')),
  createPrintingRequest: () =>
    invoke(apiClient.POST('/api/printRequest', { headers: { 'Content-Type': 'text/plain' } })),
  uploadFile: (printingRequestId: string, file: File) =>
    invoke(
      apiClient.POST('/api/printRequest/{printingRequestId}/uploadFile', {
        params: { path: { printingRequestId } },
        body: {
          file: ''
        },
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
      apiClient.POST('/api/printRequest/uploadConfig/{fileId}', {
        params: { path: { fileId } },
        body: fileConfig
      })
    ),
  deleteFile: (fileId: string) =>
    invoke(
      apiClient.DELETE('/api/printRequest/file/{fileId}', {
        params: { path: { fileId } }
      })
    ),
  getListFilesByPrintingRequest: (printingRequestId: string) =>
    invoke(
      apiClient.GET('/api/printRequest/{printingRequestId}/files', {
        params: { path: { printingRequestId } }
      })
    ),
  updateAmountFiles: (payload: FileAmount[]) =>
    invoke(
      apiClient.PATCH('/api/printRequest/printAmount', {
        body: payload
      })
    )
};
