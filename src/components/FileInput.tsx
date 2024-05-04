import React, { useState } from 'react';
import './css/file-input.css';

interface FileInputProps {
  label: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ label, accept, onChange, visible }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
    onChange(event);
  };

  return (
    <div className="file-input" style={{ display: visible ? 'block' : 'none' }}>
      <input type="file" id="fileInput" accept={accept} onChange={handleFileChange} className='choose-file'/>
      <label htmlFor="fileInput" className='upload-file'>{selectedFile ? (
        <div>
          {selectedFile.name}
        </div>
      ):label}</label>
    </div>
  );
};

export default FileInput;
