import React from 'react';
import './PlayPauseButton.css'; // We'll create a CSS file for styling the button

function PlayPauseButton({ isPlaying, setIsPlaying , loop, isRecording, isCountingDown})  {
    const togglePlayPause = () => {
        if (isPlaying) {
            loop.stop();
        }
        else {
            loop.start();
        }
        setIsPlaying((prev) => !prev); // Toggle play/pause state
    };

  return (
    <button className="play-pause-button" onClick={togglePlayPause} disabled={ isRecording || isCountingDown}>
      {isPlaying ? '⏸️' : '▶️'} {/* Display pause icon when playing, and play icon otherwise */}
    </button>
  );
};

export default PlayPauseButton;