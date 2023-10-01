import React from "react";
import Result from "./Result"; // Import the Result component

function ResultPage({
  score,
  totalQuestions,
  email,
  quizData,
  analysisData,
}) {
  return (
    <div className="result-page">
      <h1>Quiz Result</h1>
      {/* Pass the necessary props to the Result component */}
      <Result
        score={score}
        totalQuestions={totalQuestions}
        email={email}
        quizData={quizData}
        analysisData={analysisData}
      />
      {/* You can add more content or components for the result page */}
    </div>
  );
}

export default ResultPage;
