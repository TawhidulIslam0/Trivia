import React from "react";

export default function RadioButtons({ label, values, value, onChange, color }) {
  const radioGroupUniqueName = React.useId(); // Native hook creates unique input names safely

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <span style={{ color: "black", fontSize: "12px", fontWeight: "600" }}>{label}</span>}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {values.map((val, idx) => (
          <label key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
            <input
              type="radio"
              name={radioGroupUniqueName}
              value={val}
              checked={value === val}
              onChange={onChange}
              style={{ accentColor: color || "black" }}
            />
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}