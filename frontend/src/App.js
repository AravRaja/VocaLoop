import React, { useState } from "react";
import DAWGrid from "./components/DAWGrid";
import PlaybackControls from "./components/PlaybackControls";
import Recorder from "./components/Recorder";

function App() {
  const [bpm, setBpm] = useState(120); // Default BPM
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMetronomeOn, setIsMetronomeOn] = useState(false); // State for metronome toggle

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  // Toggle the metronome on or off
  const toggleMetronome = () => {
    setIsMetronomeOn(!isMetronomeOn);
  };

  return (
    <div className="App">
      <h1>DAW Interface</h1>

      {/* DAW Grid with Playhead and BPM */}
      <DAWGrid isPlaying={isPlaying} bpm={bpm} isMetronomeOn={isMetronomeOn} />

      {/* Playback Controls */}
      <PlaybackControls
        bpm={bpm}
        setBpm={setBpm}
        isPlaying={isPlaying}
        play={play}
        pause={pause}
        isMetronomeOn={isMetronomeOn} // Pass metronome state
        toggleMetronome={toggleMetronome} // Pass toggle function
      />

      {/* Recorder Component */}
      <Recorder bpm={bpm} />
    </div>
  );
}

export default App;