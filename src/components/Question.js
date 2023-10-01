
import React, { useState } from "react";
import "../App.css";

function Question({
  question,
  options,
  onAnswerClick,
  selectedOptions, // Add selectedOptions prop
  currentQuestionIndex,
  onNextQuestionClick,
}) {
  const optionLetters = ["A", "B", "C", "D"];
  const [selectedOption, setSelectedOption] = useState(null); // State to hold the selected option

  const handleOptionClick = (option) => {

    if (!selectedOptions.includes(option)) {
      // If the option is not already selected, call onAnswerClick
      onAnswerClick(option);
      setSelectedOption(option);

    }
  };
  function decodeHtmlEntities(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  return (
    <div className="quiz-question">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question}</p>
      <div className="answer-options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`answer ${
              selectedOptions.includes(option) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option)}
           
          >
            <input
              // type="radio"
              type="radio"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionClick(option)}
            />
            <label>
              {(optionLetters[index])}. {decodeHtmlEntities(option)}
            </label>
          </div>
        ))}
      </div>
      {/* <button onClick={onNextQuestionClick}>Next</button> */}
    </div>
  );
}

export default Question;
