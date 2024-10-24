import * as Tone from "tone";
import React, { useState, useRef } from "react";
import "./PlayheadBar.css";

function PlayheadBar({playheadPosition, setPlayheadPosition}) {
    

    const handleSquareClick = (index) => {
        console.log("Square Clicked");
        setPlayheadPosition(index);
         // Set the playhead to the clicked square's index
    };
    

   
   return <div className="playhead-bar">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className={`playhead-square ${index === playheadPosition ? 'active' : ''}`}
                  onClick={() => handleSquareClick(index)} // Click to set playhead
                />
              ))}
            </div>

}

export default PlayheadBar;