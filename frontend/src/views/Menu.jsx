import React, { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import Title from "../components/Title";
import Textfield from "../components/Textfield";
import Dropdown from "../components/Dropdown";
import RadioButtons from "../components/RadioButtons";
import Button from "../components/Button";
import styles from "./Menu.module.css";

const difficulties = [
  { name: "Any Difficulty", value: null },
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
];

const types = [
  { name: "Any Type", value: null },
  { name: "Multiple Choice", value: "multiple" },
  { name: "True / False", value: "boolean" },
];

const Menu = ({ menuActions, menuState }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) =>
        setCategories(
          [
            {
              name: "Any Category",
              id: null,
            },
          ].concat(data.trivia_categories)
        )
      )
      .catch((err) => console.error("Error loading quiz categories:", err));
  }, []);

  return (
    <div>
      {categories ? (
        <div className={styles.menu}>
          <div>
            <Title className={styles.menu__title} title="Trivia Quiz" />
          </div>
          <div>
            <Textfield
              label="Number of questions"
              type="number"
              onChange={menuActions.changeNumberOfQuestions}
              value={menuState.numberOfQuestions}
              helperText="Error: Number must be an integer less than or equal to 50."
              error={!menuState.isNumberOfQuestionsValid}
            />
          </div>
          <div>
            <Dropdown
              options={categories}
              label="Category"
              onChange={(e, selected) => menuActions.changeCategory(selected)}
              value={menuState.category}
            />
          </div>
          <div>
            <Dropdown
              options={difficulties}
              label="Difficulty"
              onChange={(e, selected) => menuActions.changeDifficulty(selected)}
              value={menuState.difficulty}
            />
          </div>
          <div>
            <Dropdown
              options={types}
              label="Question type"
              onChange={(e, selected) => menuActions.changeType(selected)}
              value={menuState.type}
            />
          </div>
          <div>
            <RadioButtons
              label="Set time limit?"
              values={["yes", "no"]}
              value={menuState.useDuration}
              onChange={menuActions.changeUseDuration}
              color="#fd5660"
            />
          </div>
          {menuState.useDuration === "yes" && (
            <div>
              <Textfield
                label="Time limit (in minutes)"
                type="number"
                onChange={menuActions.changeQuizDuration}
                value={menuState.quizDuration}
                helperText="Error: Number must be greater than 0."
                error={!(menuState.quizDuration > 0)}
              />
            </div>
          )}
          <div className={styles.menu__buttonContainer}>
            <Button
              label="Start"
              onClick={menuActions.startQuiz}
            />
          </div>
        </div>
      ) : (
        <LoadingIndicator label="Menu Loading" />
      )}
    </div>
  );
};

export default Menu;