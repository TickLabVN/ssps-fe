import { Dialog } from '@material-tailwind/react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useState } from 'react';
export function TestPreviewPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [openBox, setOpenBox] = useState<boolean>(false);
  const openPreview = (file: string) => {
    setSelectedFile(file);
    setOpenBox(true);
  };
  const closePreview = () => {
    setOpenBox(!openBox);
  };
  const Files: string[] = [
    'http://localhost:3003/files/ssps-logo.jpg',
    'http://localhost:3003/files/Capstone_Project_hk231_2023_v3.pdf'
  ];
  return (
    <>
      <h1>TestPreviewPage</h1>
      <ul>
        {Files.map((file, index) => (
          <li key={index}>
            {file} <button onClick={() => openPreview(file)}>Preview</button>
          </li>
        ))}
      </ul>
      <Dialog open={openBox} handler={closePreview}>
        {selectedFile && (
          <DocViewer pluginRenderers={DocViewerRenderers} documents={[{ uri: selectedFile }]} />
        )}
        <button onClick={closePreview}>Close Preview</button>
      </Dialog>
    </>
  );
}
