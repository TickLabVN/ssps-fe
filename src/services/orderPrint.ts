import { invoke, server } from './common';

export const orderPrintService = {
  createPrintingRequest: () => invoke<{ id: string }>(server.post('/api/printRequest')),
  uploadFile: (printingRequestId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return invoke<FileMetadata>(
      server.post(`/api/printRequest/${printingRequestId}/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    );
  },
  uploadConfigFile: (fileId: string, fileConfig: FileConfig) =>
    invoke<{ status: string }>(server.post(`/api/printRequest/upload-config/${fileId}`, fileConfig))
};
