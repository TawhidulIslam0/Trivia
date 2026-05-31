import React from "react";
import * as colors from "../app/standard-colors";

const Confirmation = ({ title, text, open, togglePrompt, onRestart }) => {
  if (!open) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "400px", width: "90%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        {title && <h3 style={{ margin: "0 0 12px 0" }}>{title}</h3>}
        {text && <p style={{ margin: "0 0 20px 0", color: "#555", fontSize: "14px", lineHeight: "1.5" }}>{text}</p>}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          <button
            onClick={togglePrompt}
            style={{ background: "none", border: "none", color: colors.pink || "#fd5660", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={onRestart}
            style={{ background: "none", border: "none", color: colors.pink || "#fd5660", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;