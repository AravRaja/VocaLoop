import React from 'react';
import './BpmSlider.css'; // Import the CSS file

function BpmSlider({ bpm, setBpm ,loop}) {
  const handleBpmChange = (event) => {
    setBpm(Number(event.target.value)); // Set the new BPM value
    loop.setBpm(Number(event.target.value));
  };

  return (
    <div className="bpm-slider-container">
      <input
        className="bpm-slider"
        type="range"
        min="60"
        max="200"
        value={bpm}
        onChange={handleBpmChange}
      />
      <span className="bpm-value">{bpm}</span>
    </div>
  );
}

export default BpmSlider;