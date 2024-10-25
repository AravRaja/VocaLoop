import React from "react";

function PlaybackControls ({ bpm, setBpm, isPlaying, play, pause, isMetronomeOn, toggleMetronome , isCountingDown, setIsCountingDown, setPlayheadPosition, isRecording ,setIsPlaying}) {
  if (bpm > 80) {
    console.log("BPM is greater than 80");
  }
  const handleBpmChange = (event) => {
    setBpm(event.target.value);
  };
  const startCountdown = () => {
    console.log("Start Countdown");
    setIsCountingDown(true);
    setIsPlaying(true);
    //setPlayheadPosition(0);
    
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
      <button onClick={play} disabled={isPlaying || isRecording || isCountingDown}>Play</button>
      <button onClick={pause} disabled={!isPlaying || isRecording || isCountingDown}>Pause</button>

      {/* Metronome Toggle */}
      
    <button onClick={toggleMetronome} > {isMetronomeOn ? 'Metronome ON' : 'Metronome OFF'} </button>
    <button
          onClick={startCountdown}
          disabled={isRecording || isCountingDown}
          style={{
            backgroundColor: isRecording ? "red" : "gray",
            color: "white",
          }}
        >
          {isRecording ? "Recording..." : isCountingDown ? "Get Ready..." : "Start Recording"}
    </button>
      
    </div>
  );
};

export default PlaybackControls;