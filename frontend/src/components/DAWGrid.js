import React, { useState, useEffect } from 'react';
import './DAWGrid.css';
import { useCallback } from 'react';
const clickSound = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

const DAWGrid = ({ isPlaying, bpm, isMetronomeOn }) => {
  const gridSize = 8; // Number of columns (for an 8x8 grid)
  const rowSize = 8;  // Number of rows (for an 8x8 grid)
  const [playheadPosition, setPlayheadPosition] = useState(0);

  // Calculate the time per beat based on BPM

  const getBeatDuration = useCallback(() => {
    return (60 / bpm) * 1000; // Convert BPM to milliseconds per beat
  }, [bpm]); // Depend on bpm so it's recalculated when bpm changes
  
  const playClick = useCallback(async () => {
    if (isMetronomeOn) {
      clickSound.currentTime = 0;
      await clickSound.play();
    }
  }, [isMetronomeOn]);

  // Move the playhead when the track is playing
  useEffect(() => {
    if (isPlaying) {
      const beatDuration = getBeatDuration(); // Calculate the duration of a beat
      const interval = setInterval(() => {
        setPlayheadPosition((prev) => (prev + 1) % gridSize);
        playClick(); // Play the click sound for each beat if metronome is on
      }, beatDuration);  // Move the playhead based on the beat duration
      return () => clearInterval(interval);
    }
  }, [isPlaying, bpm, isMetronomeOn, getBeatDuration, playClick]); // Trigger effect when isPlaying, bpm, or metronome changes

  return (
    <div className="daw-grid">
      {[...Array(rowSize)].map((_, rowIndex) => (
        <div className="daw-row" key={rowIndex}>
          {[...Array(gridSize)].map((_, colIndex) => (
            <div
              className={`daw-cell ${colIndex === playheadPosition ? 'playhead' : ''}`}
              key={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DAWGrid;