import React, { useState } from 'react';
import './css/subtitle-input.css';

interface SubtitleInputProps {
  label: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
}

const SubtitleInput: React.FC<SubtitleInputProps> = ({ label, accept, onChange, visible }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
    onChange(event);
  };

  return (
    <div className= "subtitile-input" style={{ display: visible ? 'block' : 'none' }}>
      <input type="file" id="subtitleInput" accept={accept} onChange={handleFileChange} className='choose-file'/>
      {fileName ? (
        <span className="upload-file">{fileName}</span>
      ) : (
        <label htmlFor="subtitleInput" className='upload-file'>{label}</label>
      )}
    </div>
  );
};

export default SubtitleInput;
