import React from "react";

const RightArrowIconButton = ({ tooltipTitle, onClick, iconStyle, buttonStyle }) => {
  return (
    <button 
      onClick={onClick} 
      title={tooltipTitle} 
      style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", ...buttonStyle }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  );
};

export default RightArrowIconButton;