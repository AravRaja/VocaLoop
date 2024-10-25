import React from 'react';
import './DAWGrid.css';

function DAWGrid({ selectedRow }) {
  const numCells = 32; // 4 columns * 8 rows = 32 total cells
  const colorList = [
    '#ffb3b3', // Light red
    '#ffd9b3', // Light orange
    '#ffffb3', // Light yellow
    '#d9ffb3', // Light green
    '#b3ffb3', // Light mint
    '#b3d9ff', // Light blue
    '#b3b3ff', // Light purple
    '#ffb3ff'  // Light pink
  ];

  return (
    <div className="daw-grid-container">
      <div className="daw-grid">
        {[...Array(numCells)].map((_, index) => (
          <div
            className="daw-cell"
            key={index}
            style={{
              backgroundColor: Math.floor(index/4) === selectedRow ? colorList[selectedRow] : '#f0f0f0'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default DAWGrid;
