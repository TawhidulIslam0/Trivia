import React from "react";

const Dropdown = ({ options, label, onChange, value, className }) => {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <label style={{ fontSize: "12px", fontWeight: "600", color: "#fff" }}>{label}</label>}
      <select
        value={value ? JSON.stringify(value) : ""}
        onChange={(e) => {
          const parsed = e.target.value ? JSON.parse(e.target.value) : null;
          onChange(e, parsed);
        }}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
          backgroundColor: "#fff",
          color: "#333", // Force text color to be dark grey so it's always readable
          outline: "none",
          cursor: "pointer"
        }}
      >
        <option value="" style={{ color: "#333" }}>Select Option...</option>
        {options.map((opt, idx) => (
          <option key={idx} value={JSON.stringify(opt)} style={{ color: "#333" }}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;