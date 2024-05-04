import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import FileInput from './components/FileInput';
import SubtitleInput from './components/SubtitleInput';
import AdsComponent from './components/AdsComponent';
import AmazonComponent from './components/AmazonComponent';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <meta name="google-adsense-account" content="ca-pub-6641730295781081" />
      </Helmet>
      <div className='amazon'>
        <AmazonComponent textLink='https://www.amazon.in/events/greatsummersale?discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522&linkCode=ll2&tag=ravi0847-21&linkId=685e976701e2155dae55e4d8581752e7&language=en_IN&ref_=as_li_ss_tl'
          imgLink='https://m.media-amazon.com/images/I/41MloPxj+VL._SL1000_.jpg'
        />
        <AmazonComponent textLink='https://www.amazon.in/Oculus%C3%82-Advanced-Virtual-Reality-Headset/dp/B099VMT8VZ?crid=1IRFW5S52TDB9&dib=eyJ2IjoiMSJ9.g2E-A4YgD4Oqp3U-SOvRA2MNl2mp7h6yNlODz3ZOuu3sfso4MeKATYe9_lqXuC5p3vlriDKe8DmbeoytE4MRSFRnWhsfULp0oW2Z2t3Rvi-owun_UCoGuqaNbCBUN78OeRxTTIDR4v-Bu4Y0lbBNbk3UMSCjdoXzOIO7eE2dXYWSztTqkd7EYEsU57olYP-fEluBsquz4f1l5scJOV68LnLko4cKwIsI02HsDb1IZy4.NdU6DypXwgmOHN6WB3YRj2o_UUN4CKnDZrj4EGC_-mw&dib_tag=se&keywords=apple+vision+pro&qid=1714814304&s=videogames&sprefix=ap%2Cvideogames%2C239&sr=1-2&linkCode=ll1&tag=ravi0847-21&linkId=2c3a75aaed3d0d1b86ee326696494737&language=en_IN&ref_=as_li_ss_tl'
          imgLink='https://m.media-amazon.com/images/I/61GhF+JUXGL._SL1500_.jpg'
        />
        <AmazonComponent textLink='https://www.amazon.in/Apple-MacBook-14-inch-10%E2%80%91core-Unified/dp/B0CM5NR4SW?dib=eyJ2IjoiMSJ9.BrFYdChW9lViVqO6MULhFOJAVSi5WlcLh1DfpX0HyFLlRzB9LGEXZG2Fr34WaTU9izyAoygfaQDRD15ZqimDaK743U7CduPIjKKvj_fyAMIwPDgtTsCGUu1m9BGWH721mfyBw-t14PZGttFqmBP6WTnKmt0jcUeKSifKPIvc-kwDXg5GXZ9K9UyRmMdExdPapd1-mxUCVtcnhYDkE7REtUENeNqa_COaQ7JhazIjOSs.dWuNlX5it6GbwDRfMU9nvyWivlCRdQzQrTiLFqRTzaU&dib_tag=se&keywords=macbook&qid=1714814465&sr=8-7&linkCode=ll1&tag=ravi0847-21&linkId=045106329746b2bb4a3d2ce220d9d1f0&language=en_IN&ref_=as_li_ss_tl'
          imgLink='https://m.media-amazon.com/images/I/61YCWzjldDL._SL1500_.jpg'
        />
        <AmazonComponent textLink='https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY?crid=B4Z9VTNSDB3V&dib=eyJ2IjoiMSJ9.8h9A_YSPiLCsRbGj7EQ9tpw3dXsgUww6XrtuzKfjvr0pTzwddd1UzpesJ4Mv-O8QW1EVH-ptseMuAqV58yUxhsNZcvBhLoFNyOwo6WQxgb6yrZ9TYkCnFzSvkC12LVtHFzw5ICiSoA4S6CKYQNEf6VqU4snLjs4xA_99FsVDdXcQLqGUZ9hcbxedGKPwcHuqKKDfQJSDSFl80awn9q3YOVS8-qE3EDk0DSENcqjQHAM.ouqun9DeoDt-X7Fiw3tuEM-_7qC2NdGHjByPSXyBxwk&dib_tag=se&keywords=iphone&qid=1714814538&sprefix=iphon%2Caps%2C238&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll1&tag=ravi0847-21&linkId=9b852e08e99a66385310657f7490d6c5&language=en_IN&ref_=as_li_ss_tl'
          imgLink='https://m.media-amazon.com/images/I/71657TiFeHL._SL1500_.jpg'
        />
      </div>
      <div className={`${!isPlaying ? 'choose-data' : ''}`} style={{ display: isPlaying ? 'none' : '' }}>
        <FileInput label="Choose Video" accept="video/*" onChange={handleFileInputChange} visible={!isPlaying} />
        <SubtitleInput label="Choose Subtitles" accept=".vtt" onChange={handleSubtitleInputChange} visible={!isPlaying} />
      </div>

      {videoLoaded && <VideoPlayer videoSource={videoSource} subtitlesLoaded={subtitlesLoaded} onVideoRef={onVideoRef} visible={isPlaying} />}
      <AdsComponent dataAdSlot='3536444737' clientId='ca-pub-6641730295781081' />
      <div className={`${!isPlaying ? 'btn-class' : ''}`}>
        <button className="play-btn" onClick={handlePlayButtonClick} style={{ display: isPlaying ? 'none' : 'block' }}></button>
        {/* <button onClick={handleCloseButtonClick} style={{ display: isPlaying ? 'none' : 'block' }}>Close</button> */}
      </div>
    </div>
  );
};

export default App;
