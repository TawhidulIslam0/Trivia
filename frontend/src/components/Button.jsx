import React from "react";
import * as colors from "../app/standard-colors";

const Button = ({ label, onClick, disabled = false, style }) => {
  const defaultStyle = {
    padding: "10px 24px",
    backgroundColor: colors.pink || "#fd5660",
    color: "#FFF",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    fontSize: "15px",
    textTransform: "none",
    transition: "background-color 0.2s ease"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...defaultStyle, ...style }}
    >
      {label}
    </button>
  );
};

export default Button;