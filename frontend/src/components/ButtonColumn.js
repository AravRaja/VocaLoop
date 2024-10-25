import React from 'react';
import './ButtonColumn.css';  // Import the CSS file

function ButtonColumn({ selectedRow, setSelectedRow }) {
  const handleButtonClick = (index) => {
    setSelectedRow(index); // Update the selected row index
  };

  return (
    <div className="button-column">
      {[...Array(8)].map((_, index) => (
        <button
          key={index}
          className={`button-square ${index === selectedRow ? `active-row-${index}` : ""}`}
          onClick={() => handleButtonClick(index)}
        >
          
        </button>
      ))}
    </div>
  );
}

export default ButtonColumn;