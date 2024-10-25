import React, { useState, useRef, useEffect } from "react";
import DAWGrid from "./components/DAWGrid";
import PlaybackControls from "./components/PlaybackControls";
import PlayheadBar from "./components/PlayheadBar";
import Recorder from "./components/Recorder";
import Loop from './components/ToneManager';
import * as Tone from "tone";
import PlayPauseButton from "./components/PlayPauseButton";
import MetronomeButton from "./components/MetronomeButton";
import BpmSlider from "./components/BpmSlider";
import RecordButton from "./components/RecordButton";
import ButtonColumn from "./components/ButtonColumn";
import './App.css';
function App() {
  const [bpm, setBpm] = useState(120); // Ensure bpm is initialized
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPosition, setPlayheadPosition] = useState(0); // State for playhead position
  const [isMetronomeOn, setIsMetronomeOn] = useState(true); // Metronome toggle state
  const [isCountingDown, setIsCountingDown] = useState(false); // Recording toggle state
  const [isRecording, setIsRecording] = useState(false); // Recording toggle state
  const [recorder, setRecorder] = useState(null); // Recorder instance
  const [loop, setLoop] = useState(null); // Loop instance
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    console.log("Component Mounted");
    
    // Initialize the Tone.js audio context
    
    console.log("Tone.js started");
    const newLoop = new Loop(setPlayheadPosition, 120, setIsRecording, setIsCountingDown, setIsPlaying);
    setLoop(newLoop); // Store the loop instance in state
    newLoop.init(); // Initialize the loop after creating it
    

    // Optionally, return a cleanup function to stop Tone.js when the component unmounts
    return () => {
      console.log("Cleaning up");
      setLoop(null); // Reset the loop instance
       // Stop any ongoing Tone.js transport
    };
  }, []);

  return (
    <div className="center-wrapper">
      <h1>DAW Interface with Tone.js</h1>

      {/* DAW Grid with Playhead and BPM */}
      
      
      <PlayheadBar playheadPosition = {playheadPosition} setPlayheadPosition = {setPlayheadPosition} loop ={loop}/>
      
      
      <div className="daw-container">
      <ButtonColumn selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
      <DAWGrid selectedRow={selectedRow} />
      
      </div>
      {/* Playback Controls */}

      <div className="controls-wrapper">
      <PlayPauseButton
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        loop={loop}
        isRecording={isRecording}
        isCountingDown={isCountingDown}
      />
      <MetronomeButton isMetronomeOn={isMetronomeOn} setIsMetronomeOn={setIsMetronomeOn} loop = {loop} />
      <RecordButton isRecording={isRecording} isCountingDown= {isCountingDown} setIsCountingDown={setIsCountingDown} loop = {loop} />
      <BpmSlider bpm={bpm} setBpm={setBpm} loop ={loop} />
      </div>
      {/* Playback Controls */}

     
  
    </div>
  );
}

export default App;