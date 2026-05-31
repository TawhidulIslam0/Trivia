import React, { useState } from "react";
import Menu from "../views/Menu";
import Questions from "../views/Questions";
import Results from "../views/Results";
import AlertPrompt from "../components/Alert";
import styles from "./App.module.css";
function App() {
  // --- Game Settings States ---
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [category, setCategory] = useState({ name: "Any Category", id: null });
  const [difficulty, setDifficulty] = useState({ name: "Any Difficulty", value: null });
  const [type, setType] = useState({ name: "Any Type", value: null });
  
  // --- Timer Settings States ---
  const [useDuration, setUseDuration] = useState("no");
  const [quizDuration, setQuizDuration] = useState(10);

  // --- App Flow States ---
  const [currentPage, setCurrentPage] = useState("menu");
  const [quizData, setQuizData] = useState(null);
  const [errorPrompt, setErrorPrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Input Element Event Handlers ---
  const changeNumberOfQuestions = (event) => setNumberOfQuestions(parseFloat(event.target.value) || 0);
  const changeQuizDuration = (event) => setQuizDuration(parseFloat(event.target.value) || 0);
  const changeCategory = (selectedOption) => setCategory(selectedOption);
  const changeDifficulty = (selectedOption) => setDifficulty(selectedOption);
  const changeType = (selectedOption) => setType(selectedOption);
  const changeUseDuration = (event) => setUseDuration(event.target.value);
  const toggleErrorPrompt = () => setErrorPrompt((prev) => !prev);

  // --- Form Validation Bounds ---
  const isNumberOfQuestionsValid =
    numberOfQuestions >= 1 &&
    numberOfQuestions <= 50 &&
    numberOfQuestions % 1 === 0;

  const isFormValid = quizDuration > 0 && isNumberOfQuestionsValid;

  /**
   * True Fisher-Yates shuffle engine to fix the inspiration repo's 
   * alphabetical sorting bug on multiple-choice options.
   */
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Fetches data from OpenTDB and maps it immediately into game states
   */
  const startQuiz = async () => {
    if (!isFormValid) {
      toggleErrorPrompt();
      return;
    }

    setLoading(true);

    // Build query URL dynamically based on selection targets
    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;
    if (category?.id) url += `&category=${category.id}`;
    if (difficulty?.value) url += `&difficulty=${difficulty.value}`;
    if (type?.value) url += `&type=${type.value}`;

    try {
      const response = await fetch(url);
      
      if (response.status === 429) {
        alert("Rate limit reached! Wait a few seconds before starting.");
        return;
      }

      const data = await response.json();

      if (data.response_code === 0) {
        const formattedData = data.results.map((item, index) => {
          const combinedAnswers = item.incorrect_answers.concat(item.correct_answer);
          return {
            questionNumber: index + 1, // Adjusted to 1-indexed for your tables/titles
            question: item.question,
            answers: shuffleArray(combinedAnswers), 
            correctAnswer: item.correct_answer,
            selectedAnswerIndex: null, 
          };
        });

        setQuizData(formattedData);
        setCurrentPage("questions");
      } else {
        alert("Not enough questions match your filters. Try widening your categories!");
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setQuizData(null);
    setCurrentPage("menu");
  };

  // Structured action wrappers passed to children
  const menuActions = {
    changeNumberOfQuestions,
    changeCategory,
    changeDifficulty,
    changeType,
    changeQuizDuration,
    changeUseDuration,
    startQuiz,
  };

  const menuState = {
    numberOfQuestions,
    category,
    difficulty,
    type,
    useDuration,
    quizDuration,
    isNumberOfQuestionsValid,
    isFormValid,
    loading,
  };

  return (
    <div className={styles.App}>
      <div className={styles.App__card}>
        {currentPage === "menu" && (
          <Menu menuActions={menuActions} menuState={menuState} />
        )}

        {currentPage === "questions" && (
          <Questions
            quizData={quizData}
            setQuizData={setQuizData}
            setCurrentPage={setCurrentPage}
            restartQuiz={restartQuiz}
            quizDuration={quizDuration}
            useDuration={useDuration}
          />
        )}

        {currentPage === "results" && (
          <Results
            quizData={quizData}
            restartQuiz={restartQuiz}
          />
        )}

        <AlertPrompt
          title="Validation Error"
          text="Please review your setup fields before trying to start the quiz."
          open={errorPrompt}
          togglePrompt={toggleErrorPrompt}
        />
      </div>
    </div>
  );
}

export default App;