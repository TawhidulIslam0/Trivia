import React from "react";

const Textfield = ({ label, onChange, type = "text", value, helperText, error, className, inputProps }) => {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <label style={{ fontSize: "12px", fontWeight: "600" }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: error ? "1px solid #fd5660" : "1px solid #ccc",
          fontSize: "14px",
          outline: "none",
          ...inputProps
        }}
      />
      {error && helperText && (
        <span style={{ color: "#fd5660", fontSize: "11px", marginTop: "2px" }}>{helperText}</span>
      )}
    </div>
  );
};

export default Textfield;