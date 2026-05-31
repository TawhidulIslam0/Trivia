import React from "react";

const RestartIconButton = ({ tooltipTitle, onClick, iconStyle, buttonStyle }) => {
  return (
    <button 
      onClick={onClick} 
      title={tooltipTitle} 
      style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", ...buttonStyle }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
      </svg>
    </button>
  );
};

export default RestartIconButton;