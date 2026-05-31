import React from "react";
import Button from "./Button";
import * as colors from "../app/standard-colors";

const LoadingIndicator = ({ label, onRestart, quizData, titleClassName }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
      <h1 className={titleClassName}>{label}</h1>
      {!quizData ? (
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: `4px solid ${colors.pink || "#fd5660"}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginTop: "20px"
        }} />
      ) : (
        <Button
          label="RESTART"
          onClick={onRestart}
          style={{ marginTop: "20px" }}
        />
      )}
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingIndicator;