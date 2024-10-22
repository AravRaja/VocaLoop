import React from "react";

const PlaybackControls = ({ bpm, setBpm, isPlaying, play, pause, isMetronomeOn, toggleMetronome }) => {
  const handleBpmChange = (event) => {
    setBpm(event.target.value);
  };

  return (
    <div className="controls">
      {/* BPM Slider */}
      <div>
        <label>Set BPM: {bpm}</label>
        <input
          type="range"
          min="30"
          max="240"
          value={bpm}
          onChange={handleBpmChange}
        />
      </div>

      {/* Play/Pause Controls */}
      <button onClick={play} disabled={isPlaying}>Play</button>
      <button onClick={pause} disabled={!isPlaying}>Pause</button>

      {/* Metronome Toggle */}
      <div className="metronome-toggle">
        <button onClick={toggleMetronome} >
          {isMetronomeOn ? 'Metronome ON' : 'Metronome OFF'}
        </button>
      </div>
    </div>
  );
};

export default PlaybackControls;