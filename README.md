# 🗺️ Trivia Quiz Game

A sleek, responsive, and immersive frontend trivia quiz application designed for trivia enthusiasts. The app features a dark neon space aesthetic, responsive layouts, customizable configurations, and live score reporting.

## 📝 Description

This trivia quiz game utilizes the [Open Trivia Database API](https://opentdb.com/api_config.php) to dynamically query questions and answers based on real-time selections. 

Before launching a game, users can fully customize their session by configuring:
* **Number of questions** (e.g., 10, 20, 50)
* **Category** (General Knowledge, Science, History, Pop Culture, etc.)
* **Difficulty Level** (Easy, Medium, Hard)
* **Question Type** (True/False or Multiple Choice)
* **Optional Time Limit** (Countdown timer with color alerts)

After answering all questions, the game transitions seamlessly to an in-depth results overview board. This dashboard calculates percentages, visually flags correct vs. incorrect answers, reveals correct responses for missed questions, and provides a quick option to spin up a completely fresh custom quiz.

---

## 🚀 Features

* **Complete Customization:** Full integration with the OpenTDB structural parameters.
* **Smart UI Layouts:** Handles True/False layout shifting natively to place "True" consistently on the screen first.
* **Immersive Background:** Gorgeous dark gaming dashboard framed with glowing knowledge graphics.
* **Live Progress Engine:** Responsive progress tracking bars and interactive pagination arrows.
* **Clean Encoding Translation:** Automatically decodes messy HTML entity strings (`&quot;`, `&#039;`, `&eacute;`) natively so quiz content remains pristine.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18
* **Build Tooling / Dev Server:** Vite
* **Styling Architecture:** Standard CSS Modules & Global Index Styling (Flexbox/Grid overrides)
* **State Management:** Functional React Hooks (`useState`, `useEffect`, `useId`)

---

## 💻 Application Set Up

Follow these steps to clone, install, and run this application locally on your computer.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine (Recommended: Version 18 or higher).

### Step-by-Step Installation

```bash
# Clone the repository
git clone [https://github.com/TawhidulIslam0/Trivia.git](https://github.com/TawhidulIslam0/Trivia.git)

# Navigate into the frontend project directory
cd frontend

# Install the project dependencies
npm install

# Start the local development server and launch it automatically
npm run dev -- --open
