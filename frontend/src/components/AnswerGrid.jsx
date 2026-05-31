import React from "react";
import Button from "./Button"; // This is imported as Button!
import styles from "./AnswerGrid.module.css";

const AnswerGrid = ({ answers, setSelectedAnswerIndex, selectedAnswerIndex }) => {
  if (!answers || answers.length === 0) return null;

  const isBoolean = answers.length === 2;
  const processedAnswers = isBoolean ? [answers[1], answers[0]] : answers;

  return (
    <div className={styles.answerGrid}>
      {processedAnswers.map((answer, renderIndex) => {
        const originalIndex = isBoolean ? (renderIndex === 0 ? 1 : 0) : renderIndex;
        const isCurrentSelected = selectedAnswerIndex === originalIndex;

        const dynamicButtonClass = isCurrentSelected 
          ? `${styles.answerButton} ${styles.selected}` 
          : styles.answerButton;

        return (
          /* Change this tag from AnswerButton to Button */
          <Button
            key={originalIndex}
            label={answer}
            onClick={() => setSelectedAnswerIndex(originalIndex)}
            style={isCurrentSelected ? { backgroundColor: "#fd5660", color: "#fff" } : { backgroundColor: "#f4f4f0", color: "#333" }}
          />
        );
      })}
    </div>
  );
};

export default AnswerGrid;