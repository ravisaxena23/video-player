import React, { useRef, useEffect } from 'react';
import './css/video-player.css'

interface VideoPlayerProps {
    videoSource: string;
    subtitlesLoaded: boolean;
    onVideoRef: (node: HTMLVideoElement) => void;
    visible: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSource, subtitlesLoaded, onVideoRef, visible }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (subtitlesLoaded) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [subtitlesLoaded]);

    return (
        <div style={{ display: visible ? 'block' : 'none' }}>
            <video ref={videoRef} controls preload="auto" className='video-js'>
                <source src={videoSource} type="video/mp4" />
                {/* Fallback source for browsers that don't support HTML5 video */}
                <p className="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that supports HTML5 video
                </p>
            </video>
        </div>
    );
};

export default VideoPlayer;
