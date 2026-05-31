import React, { useState, useEffect } from "react";
import AnswerGrid from "../components/AnswerGrid";
import LeftArrowIconButton from "../components/LeftArrowIconButton";
import RestartIconButton from "../components/RestartIconButton";
import RightArrowIconButton from "../components/RightArrowIconButton";
import LoadingIndicator from "../components/LoadingIndicator";
import Title from "../components/Title";
import ProgressBar from "../components/ProgressBar";
import ConfirmationPrompt from "../components/Confirmation";
import AlertPrompt from "../components/Alert";
import { convertToRegularString } from "../components/StringModifiers";
import styles from "./Questions.module.css";

const Questions = ({
  quizData,
  setQuizData,
  setCurrentPage,
  restartQuiz,
  useDuration,
  quizDuration,
}) => {
  const [questionId, setQuestionId] = useState(0);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const [alertPrompt, setAlertPrompt] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(quizDuration * 60);

  const toggleConfirmationPrompt = () => setConfirmationPrompt(!confirmationPrompt);
  const toggleAlertPrompt = () => setAlertPrompt(!alertPrompt);

  const selectedAnswerIndex =
    quizData && quizData[questionId] && quizData[questionId].selectedAnswerIndex;

  const incrementQuestionId = () => setQuestionId(questionId + 1);
  const decrementQuestionId = () => setQuestionId(questionId - 1);

  const handleSetSelectedAnswerIndex = (indexValue) => {
    setQuizData(
      quizData.map((object, idx) =>
        idx === questionId ? { ...quizData[questionId], selectedAnswerIndex: indexValue } : object
      )
    );
  };

  // Fixed: Missing click finish navigation connector added
  const onClickFinishButton = () => {
    setCurrentPage("results");
  };

  useEffect(() => {
    if (useDuration === "yes" && quizData && quizData.length > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCurrentPage("results");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [useDuration, quizData, setCurrentPage]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getTimerColor = () => {
    if (secondsLeft < 10) return "#ff4d4d";
    if (secondsLeft < 60) return "#ffcc00";
    return "#fd5660";
  };

  return (
    <div>
      {quizData && quizData.length > 0 ? (
        <div className={styles.questionsContainer}>
          {useDuration === "yes" && (
            <div 
              className={styles.questions__countdownTimer}
              style={{ color: getTimerColor(), fontWeight: "bold", fontSize: "24px" }}
            >
              ⏱️ {formatTime(secondsLeft)}
            </div>
          )}
          <div>
            <Title
              className={styles.questions__title}
              title={`${questionId + 1}. ${
                quizData[questionId] && convertToRegularString(quizData[questionId].question)
              }`}
            />
          </div>
          
          <AnswerGrid
            answers={
              quizData[questionId] &&
              quizData[questionId].answers.map((ans) => convertToRegularString(ans))
            }
            selectedAnswerIndex={selectedAnswerIndex}
            setSelectedAnswerIndex={handleSetSelectedAnswerIndex}
          />

          <div className={styles.questions__buttonsContainer}>
            {questionId !== 0 && (
              <LeftArrowIconButton
                tooltipTitle="Go to previous question"
                onClick={decrementQuestionId}
              />
            )}
            <RightArrowIconButton
              tooltipTitle={questionId < quizData.length - 1 ? "Go to next question" : "Finish quiz"}
              onClick={() => {
                const hasAnswered = selectedAnswerIndex !== null && selectedAnswerIndex !== undefined;
                if (questionId < quizData.length - 1) {
                  hasAnswered ? incrementQuestionId() : toggleAlertPrompt();
                } else {
                  hasAnswered ? onClickFinishButton() : toggleAlertPrompt();
                }
              }}
            />
            <RestartIconButton
              tooltipTitle="Restart Quiz"
              onClick={toggleConfirmationPrompt}
            />
          </div>

          <div className={styles.questions__progressBar}>
            <ProgressBar value={questionId + 1} total={quizData.length} />
          </div>
        </div>
      ) : (
        <div className={styles.questions__loadingIndicator}>
          <LoadingIndicator
            label={quizData ? "No Questions Available. Customize and try again." : "Questions Loading"}
            quizData={quizData}
            onRestart={restartQuiz}
          />
        </div>
      )}

      <ConfirmationPrompt
        title="Confirmation"
        text="Are you sure you want to restart the quiz?"
        open={confirmationPrompt}
        togglePrompt={toggleConfirmationPrompt}
        onRestart={restartQuiz}
      />
      <AlertPrompt
        title="Error"
        text="Please select an answer before clicking next."
        open={alertPrompt}
        togglePrompt={toggleAlertPrompt}
      />
    </div>
  );
};

export default Questions;