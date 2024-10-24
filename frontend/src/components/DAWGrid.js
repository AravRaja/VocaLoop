import React from 'react';
import './DAWGrid.css';

const DAWGrid = () => {
  const numCells = 32; // 4 columns * 8 rows = 32 total cells

  return (
<div className="daw-grid-container">
  <div className="daw-grid">
    {[...Array(32)].map((_, index) => (
      <div className="daw-cell" key={index} />
    ))}
  </div>
</div>
  );
};

export default DAWGrid;
