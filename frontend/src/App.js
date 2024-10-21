import React, { useState} from "react";

//need to pick a better click sound
const clickSound = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

function App() {
  const [bpm, setBpm] = useState(120); // Default BPM
  const [isRecording, setIsRecording] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [audioStream, setAudioStream] = useState(null); 
  const [audioDownloadLink, setAudioDownloadLink] = useState(null);
  
  const handleBpmChange = (event) => {
    setBpm(event.target.value);
  };
  const getBeatDuration = () => {
    return (60 / bpm) * 1000; // ms per beat
  };

  //needs to be awaited to play the sound
  const playClick = async () => {
    clickSound.currentTime = 0;
    await clickSound.play();
  };


  const startCountdown = () => {
    setIsCountingDown(true);
    const beatDuration = getBeatDuration();
    let beatCount = 0;

    const clickInterval = setInterval(async () => {
      if (beatCount >= 4) {
        clearInterval(clickInterval);
        startRecording();
      }
      else{

      await playClick();  // Play the click sound
      beatCount += 1;
    }

    }, beatDuration);  
  };



const startRecording = async () => {
  setIsCountingDown(false);
  setIsRecording(true);
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  setAudioStream(stream); 

  const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
  const chunks = [];
  
  recorder.onstop = () => {
    console.log("Recording stopped. Total chunks captured:", chunks.length);
    setIsRecording(false);
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop()); 
    }

    const blob = new Blob(chunks, { type: recorder.mimeType });
    const audioURL = window.URL.createObjectURL(blob);
    setAudioDownloadLink(audioURL);
  };

  recorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  recorder.start();

  //stops recording after 4 beats
  const beatDuration = getBeatDuration();
  setTimeout(() => {
    recorder.stop();
  }, 4 * beatDuration);

};


const saveRecording = () => {
  if (audioDownloadLink) {

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = audioDownloadLink;
    a.download = "recording.webm";  
    
    a.click(); // triggers download
    window.URL.revokeObjectURL(audioDownloadLink);  //free resources
  } else {
    console.error("No recording available to save.");
  }
};

  return (
    <div className="App">
      <h1>BPM: {bpm}</h1>

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

      {/* Recording Button */}
      <div>
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

      {/* Save Recording Button */}
      {!isRecording && (
        <button onClick={saveRecording}>Save Recording</button>
      )}
    </div>
  );
}

export default App;