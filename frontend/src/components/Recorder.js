import React, { useState } from "react";

// Need to pick a better click sound
const clickSound = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");

const Recorder = ({ bpm }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [audioDownloadLink, setAudioDownloadLink] = useState(null);

  const getBeatDuration = () => {
    return (60 / bpm) * 1000; // ms per beat
  };

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
      } else {
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

    const beatDuration = getBeatDuration();
    setTimeout(() => {
      recorder.stop();
    }, 4 * beatDuration);
  };

  const saveRecording = async () => {
    if (audioDownloadLink) {
      const blob = await fetch(audioDownloadLink).then(res => res.blob());

      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');

      try {
        const response = await fetch('http://127.0.0.1:8000/upload-audio/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully:', data.file_url);
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error("No recording available to save.");
    }
  };

  return (
    <div>
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
      {!isRecording && audioDownloadLink && (
        <button onClick={saveRecording}>Save Recording</button>
      )}
    </div>
  );
};

export default Recorder;