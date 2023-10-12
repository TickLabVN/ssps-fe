import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import Modal from 'react-modal';
import React, { useState } from 'react';
export function TestPreviewPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openPreview = (file: string) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };
  const closePreview = () => {
    setModalIsOpen(false);
  };
  const Files: string[] = [
    'http://localhost:3000/ssps-logo.jpg',
    'http://localhost:3000/2309.07870v1.pdf'
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
      <Modal isOpen={modalIsOpen} onRequestClose={closePreview}>
        {selectedFile && (
          <DocViewer pluginRenderers={DocViewerRenderers} documents={[{ uri: selectedFile }]} />
        )}
        <button onClick={closePreview}>Close Preview</button>
      </Modal>
    </>
  );
}
