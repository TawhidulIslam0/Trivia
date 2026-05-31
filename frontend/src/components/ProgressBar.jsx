import React from "react";
import styles from "./ProgressBar.module.css";
import * as colors from "../app/standard-colors";

const ProgressBar = ({ value, total }) => {
  const currentWidth = total > 0 ? `${(value / total) * 100}%` : "0%";
  const currentProgressColor = value !== total ? (colors.pink || "#fd5660") : (colors.green || "#4CAF50");

  return (
    <div className={styles.bar}>
      <div
        style={{
          width: currentWidth,
          backgroundColor: currentProgressColor,
        }}
        className={styles.bar__progress}
      />
      <div className={styles.bar__remainder} />
    </div>
  );
};

export default ProgressBar;