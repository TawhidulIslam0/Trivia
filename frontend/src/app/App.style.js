import * as colors from "./standard-colors";

// Base button styles
export const buttonBaseStyle = {
  padding: "10px 20px",
  fontSize: "clamp(12px, 1.5vh, 15px)",
  backgroundColor: colors.pink || "#e91e63", // Falls back to hot pink if standard-colors isn't loaded
  color: "#FFF",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};

// Hover state alterations
export const buttonHoverStyle = {
  backgroundColor: colors.darkPink || "#c2185b", // A slightly deeper shade for visual feedback
  transform: "translateY(-1px)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"
};