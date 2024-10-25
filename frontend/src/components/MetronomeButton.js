import React from 'react';
import './MetronomeButton.css'; // Import the CSS file

function MetronomeButton({ isMetronomeOn, setIsMetronomeOn ,loop}) {
  const toggleMetronome = () => {
    loop.setMetronome(!isMetronomeOn)
    setIsMetronomeOn((prev) => !prev); 
    
  };

  return (
    <button
      className="metronome-button"
      onClick={toggleMetronome}
    >
      {isMetronomeOn ? '🔔' : '🔕'}
    </button>
  );
}

export default MetronomeButton;