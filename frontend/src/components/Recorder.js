class Recorder {
  constructor(bpm) {
    this.bpm = bpm || 120;
    this.stream = null;
    this.recorder = null;
    this.clickSound = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  }

  async init() {
    // Initialize the audio stream
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  getBeatDuration() {
    return (60 / this.bpm) * 1000; // ms per beat
  }

  async playClick() {
    this.clickSound.currentTime = 0;
    await this.clickSound.play();
  }

  // Create a new MediaRecorder instance every time you start recording
  async start() {
    console.log("Recording started!!!!!!!");

      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.recorder = new MediaRecorder(this.stream, { mimeType: "audio/webm" });
      this.recorder.start();
      const chunks = [];

      this.recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      this.recorder.onstop = () => {
        console.log("Recording stopped. Total chunks captured:", chunks.length);

        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop()); // Stop the audio stream
          console.log("Audio stream stopped.");
        }

        const blob = new Blob(chunks, { type: this.recorder.mimeType });
        this.audioDownloadLink = window.URL.createObjectURL(blob);
      };

      // Start the recording
      
    
  }

  stop() {
    if (this.recorder && this.recorder.state === "recording") {
      console.log("Recording stopped!!!!!!!");
      this.recorder.stop(); // Stop recording
    }
  }

  async sendToBackend() {
    if (this.audioDownloadLink) {
      const blob = await fetch(this.audioDownloadLink).then(res => res.blob());

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
  }

  async countdown() {
    const beatDuration = this.getBeatDuration();
    let beatCount = 0;

    const clickInterval = setInterval(async () => {
      if (beatCount >= 4) {
        clearInterval(clickInterval);
        console.log("Countdown finished");
        return true;
      } else {
        await this.playClick();  // Play the click sound
        beatCount += 1;
      }
    }, beatDuration);
  }
}

export default Recorder;