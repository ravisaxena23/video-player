import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import FileInput from './components/FileInput';
import SubtitleInput from './components/SubtitleInput';
import AdsComponent from './components/AdsComponent';
import './App.css'

const App: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [subtitlesLoaded, setSubtitlesLoaded] = useState<boolean>(false);
  const [videoSource, setVideoSource] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    const fileType = file.type;
    const isQuicktime = fileType === 'video/quicktime';

    if (isQuicktime) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const blob = new Blob([event.target!.result as ArrayBuffer], { type: fileType });
        const objectURL = URL.createObjectURL(blob);
        setVideoSource(objectURL);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setVideoSource(URL.createObjectURL(file));
    }
    setVideoLoaded(true);
  };

  const handleSubtitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subtitleFile = event.target.files?.[0];
    if (!subtitleFile || !videoElement) return;

    const language = prompt("Enter the language of the subtitles (e.g., en, fr, es):") || 'en';
    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.label = 'Custom';
    track.srclang = language.toLowerCase();
    track.src = URL.createObjectURL(subtitleFile);
    track.default = true;

    const existingTracks = videoElement.getElementsByTagName('track');
    Array.from(existingTracks).forEach(track => track.remove());

    videoElement.appendChild(track);
    setSubtitlesLoaded(true);
  };

  const handlePlayButtonClick = () => {
    if (!videoLoaded) return;
    setIsPlaying(true);
    if (videoElement && !subtitlesLoaded) {
      videoElement.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  };

  const handleCloseButtonClick = () => {
    if (videoElement) {
      videoElement.pause();
      videoElement.src = ''; // Clear video source
      setVideoLoaded(false);
      setSubtitlesLoaded(false);
      setIsPlaying(false);
    }
  };

  const onVideoRef = (node: HTMLVideoElement) => {
    if (node) {
      setVideoElement(node);
    }
  };

  return (
    <div className='contain'>
      <AdsComponent dataAdSlot='3536444737' clientId='ca-pub-6641730295781081' />
      <div className={`${!isPlaying ? 'choose-data' : ''}`} style={{ display: isPlaying ? 'none' : '' }}>
        <FileInput label="Choose Video" accept="video/*" onChange={handleFileInputChange} visible={!isPlaying} />
        <SubtitleInput label="Choose Subtitles" accept=".vtt" onChange={handleSubtitleInputChange} visible={!isPlaying} />
      </div>

      {videoLoaded && <VideoPlayer videoSource={videoSource} subtitlesLoaded={subtitlesLoaded} onVideoRef={onVideoRef} visible={isPlaying} />}
      <div className={`${!isPlaying ? 'btn-class' : ''}`}>
        <button className="play-btn" onClick={handlePlayButtonClick} style={{ display: isPlaying ? 'none' : 'block' }}></button>
        {/* <button onClick={handleCloseButtonClick} style={{ display: isPlaying ? 'none' : 'block' }}>Close</button> */}
      </div>
    </div>
  );
};

export default App;
