import { PlayerWrapper, YouTubePlayer } from "./CustomMediaPlayer.styles";
import React, { useEffect, useRef } from 'react';

const CustomMediaPlayer = ({ videoKey }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Clean up any existing player
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoKey,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onError: (event) => console.error('YouTube Player Error:', event.data),
          onReady: () => console.log('YouTube Player is ready'),
        },
      });
    };

    if (!window.YT) {
      // Load the YouTube IFrame API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      // Wait for the API to load
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoKey]);

  return (
    <PlayerWrapper
      sx={{
        height: {
          xs: '250px',
          sm: '450px',
          md: '550px',
        },
      }}
    >
      <YouTubePlayer id="youtube-player"></YouTubePlayer>
    </PlayerWrapper>
  );
};

export default CustomMediaPlayer;
