// QuestionIndexBar.js

import React from "react";
import "../App.css";
function QuestionIndexBar({
  quizData,
  visitedQuestions,
  attemptedQuestions,
  currentQuestion,
  onQuestionClick,
}) {
  return (
    <div className="question-index-bar">
      {quizData.map((_, index) => (
        <div
          key={index}
          className={`question-box ${
            index === currentQuestion ? "current" : ""
          } ${visitedQuestions[index] ? "visited" : ""} ${
            attemptedQuestions[index] ? "attempted" : ""
          }`}
          onClick={() => onQuestionClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}

export default QuestionIndexBar;
