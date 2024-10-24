import React from 'react';
import './RecordButton.css';
function RecordButton({isRecording, isCountingDown, setIsCountingDown, loop}){
    const startCountdown = () => {
        
        setIsCountingDown(true);
        loop.countdown();
        
      };
    


    return (
        <button
          className= {`record-button ${isRecording ? 'recording' : ''}`}
          onClick={startCountdown}
          disabled={isRecording || isCountingDown}

        >
          {isRecording ? "🔴" : isCountingDown ? "⏳" : "🎤"}
        </button>
      );
}


export default RecordButton;