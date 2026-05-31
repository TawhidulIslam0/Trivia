import React from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { convertToRegularString } from "../components/StringModifiers";

function Results({ quizData, restartQuiz }) {
  if (!quizData) return null;

  // Process the answers directly from the quizData state format
  const totalCount = quizData.length;
  const correctCount = quizData.filter((item) => {
    const selectedAnswerText = item.answers[item.selectedAnswerIndex];
    return selectedAnswerText === item.correctAnswer;
  }).length;
  
  const percentage = Math.round((correctCount / totalCount) * 100);

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1 style={{ color: "#fd5660", marginBottom: "10px" }}>Quiz Completed! 🎉</h1>
      
      <div style={{ background: "rgba(255,255,255,0.07)", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
        <h2 style={{ color: "#fff", margin: "0 0 10px 0" }}>Your Score: {correctCount} / {totalCount}</h2>
        <h3 style={{ color: "#fd5660", margin: "0 0 10px 0", fontSize: "28px" }}>{percentage}%</h3>
        <p style={{ color: "#eee", margin: 0 }}>{percentage >= 70 ? "Excellent job! 🔥" : "Better luck next time! 👍"}</p>
      </div>

      <Button label="Play Again 🔄" onClick={restartQuiz} style={{ margin: "10px auto 30px auto", display: "block" }} />

      <h2 style={{ color: "#fff", textAlign: "left", fontSize: "18px", marginBottom: "15px" }}>Review Your Answers:</h2>
      <div style={{ display: "grid", gap: "15px", textAlign: "left", maxHeight: "40vh", overflowY: "auto", paddingRight: "5px" }}>
        {quizData.map((item, index) => {
          const selectedAnswerText = item.answers[item.selectedAnswerIndex] || "None Specified";
          const isCorrect = selectedAnswerText === item.correctAnswer;

          return (
            <div 
              key={index} 
              style={{ 
                borderLeft: `5px solid ${isCorrect ? "#4CAF50" : "#F44336"}`, 
                background: "rgba(255,255,255,0.04)",
                padding: "15px",
                borderRadius: "4px"
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#fff" }}>
                Q{index + 1}: {convertToRegularString(item.question)}
              </p>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#ccc" }}>
                Your Answer: <span style={{ color: isCorrect ? "#4CAF50" : "#F44336", fontWeight: "bold" }}>{convertToRegularString(selectedAnswerText)}</span>
              </p>
              {!isCorrect && (
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#4CAF50", fontWeight: "600" }}>
                  Correct Answer: {convertToRegularString(item.correctAnswer)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;