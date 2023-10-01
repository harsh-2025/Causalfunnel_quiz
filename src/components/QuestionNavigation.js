// QuestionNavigation.js

import React from "react";

function QuestionNavigation({ quizData, currentQuestion, onSelectQuestion }) {
  return (
    <div className="question-navigation">
      <h3>Jump to Question:</h3>
      <select
        value={currentQuestion}
        onChange={(e) => onSelectQuestion(parseInt(e.target.value))}
      >
        {quizData.map((_, index) => (
          <option key={index} value={index}>
            Question {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default QuestionNavigation;
