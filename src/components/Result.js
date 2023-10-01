
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/result.css"




function getOptionLetter(index) {
  return String.fromCharCode(65 + index);
}
function Result({ score, totalQuestions, email, quizData, analysisData }) {
  // State variable to control the visibility of the result
  const [showResult, setShowResult] = useState(false);
  const totalQuestionsAttempted = analysisData.filter(
    (questionData) => questionData.userSelectedOption !== ""
  ).length;
  // Function to toggle the visibility of the result
  const toggleResult = () => {
    setShowResult(!showResult);
  };
  const reattemptQuiz = () => {
    // Refresh the page after 2 seconds
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const percentage = (score / totalQuestions) * 100;

  function decodeHtmlEntities(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  return (
    <div className="result">
      <h1>Result</h1>
      <p>Email: {email}</p>
      <p>Score: {score}</p>

      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Questions : {score}</p>
      <p className="percentage">Percentage: {(score / totalQuestions) * 100}%</p>
      {/* <ProgressBar now={percentage} /> */}

      {/* Button to show/hide the result */}
      <button onClick={toggleResult}>
        {showResult ? "Hide Result" : "Show Result"}
      </button>
      <button onClick={reattemptQuiz}>Reattempt Quiz</button>

{/* Add a link to navigate back to the quiz */}


      {/* Display the analysis only when showResult is true */}
      {showResult && (
       
        <div className="result-analysis">
  {quizData.map((questionData, index) => (
    <div key={index} className="question-analysis">
      <h3>Question {index + 1}</h3>
      <p>{decodeHtmlEntities(questionData.question)}</p>
      <p>Options:</p>

              {questionData.options.map((option, optionIndex) => (
              
                <li
                key={optionIndex}
                className={
                  questionData.answer === option
                    ? "correct-answer"
                    : analysisData[index].userSelectedOption === option
                    ? "user-selected-answer"
                    : ""
                }
              >
                {getOptionLetter(optionIndex)}: {decodeHtmlEntities(option)}
              </li>
              ))}

        {/* {questionData.options.join(", ")}</p> */}
      <p>Correct Answer: {decodeHtmlEntities(questionData.answer)}</p>
      <p>User Selected Answer: {decodeHtmlEntities(analysisData[index].userSelectedOption)}</p>
      <p>Marks Obtained: {analysisData[index].marksObtained}</p>
      <hr></hr>
    </div>
  ))}
</div>

      )}
    </div>
  );
}

export default Result;
