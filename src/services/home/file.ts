import { mockFileServer, invoke } from '@services/common';

export const fileService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return invoke<{ message: string }>(
      mockFileServer.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    );
  },
  getAll: () => invoke<FileData[]>(mockFileServer.get('/files'))
};
