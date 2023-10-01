import React from "react";
import "../styles/numberbox.css"
function QuestionNumberBox({
    totalQuestions,
    currentQuestion,
    onQuestionClick,
    attemptedQuestions,
  }) {
    // Calculate the number of rows and columns for the grid
    const rows = Math.ceil(totalQuestions / 5);
    const columns = 5;
  
    return (
      <div className="question-number-box">
        <div className="question-number-grid">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <div
              key={index}
              className={`question-number ${
                index === currentQuestion ? "current" : ""
              } ${attemptedQuestions[index] ? "attempted" : ""}`}
              onClick={() => onQuestionClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }
    export default QuestionNumberBox;



