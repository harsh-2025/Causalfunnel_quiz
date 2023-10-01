import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/quizapp.css"
import StartPage from "./StartPage";
import Question from "./Question";
import Result from "./Result";
import Timer from "./Timer";
import QuestionNavigation from "./QuestionNavigation"; // Import the QuestionNavigation component
import QuestionNumberBox from "./QuestionNumberBox";

// import SubmitPopup from "./SubmitPopup";

// CommonJS


function QuizApp() {
  const totalQuestions = 15;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const handleShowResultClick = () => {
    setShowResult(true);
  };
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizInProgress, setQuizInProgress] = useState(false);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState(
    Array.from({ length: totalQuestions }, () => false)
  );
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [quizData, setQuizData] = useState([]); // Store fetched quiz questions

  // State variable to control the visibility of the analysis
  const [showAnalysis, setShowAnalysis] = useState(false);
  

  // Function to calculate the detailed analysis
  const calculateAnalysis = () => {
    const analysis = quizData.map((questionData, index) => {
      const userSelectedOption = userAnswers[index];
      const isCorrect = userSelectedOption === questionData.answer;
      const marksObtained = isCorrect ? 1 : 0;

      return {
        question: questionData.question,
        options: questionData.options,
        correctAnswer: questionData.answer,
        userSelectedOption,
        marksObtained,
      };
    });

    return analysis;
  };
  function decodeHtmlEntities(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  const handleStartQuiz = async (userEmail) => {
    setEmail(userEmail);
    setQuizStarted(true);
    setVisitedQuestions(new Array(quizData.length).fill(false));
    setAttemptedQuestions(new Array(quizData.length).fill(false));
    // Fetch quiz questions from the API
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=15"
      );
      const fetchedQuestions = response.data.results;

      // Process the fetched data to create quizData array
      const formattedQuestions = fetchedQuestions.map((question) => {
        const options = [...question.incorrect_answers, question.correct_answer];
        return {
          question: question.question,
          options: options.sort(() => Math.random() - 0.5), // Shuffle options
          answer: question.correct_answer,
        };
      });

      setQuizData(formattedQuestions);
      setQuizInProgress(true); // Start the quiz after fetching questions
      setVisitedQuestions(new Array(formattedQuestions.length).fill(false));
      setAttemptedQuestions(new Array(formattedQuestions.length).fill(false));
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
    
  };

  const handleAnswerClick = (selectedAnswer) => {

    

    // ******
    // Check if the selected answer is correct
    if (selectedAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    const isCorrect = selectedAnswer === quizData[currentQuestion].answer;
    const currentQuestionData = quizData[currentQuestion];
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);
    // Update analysisData with user's choice and marks obtained
    const updatedAnalysisData = [...analysisData];
    updatedAnalysisData[currentQuestion] = {
      userSelectedOption: selectedAnswer,
      marksObtained: isCorrect ? 1 : 0, // Assuming 1 mark for a correct answer, 0 for incorrect
    };

    setAnalysisData(updatedAnalysisData);

    // Mark the current question as attempted
    const updatedAttemptedQuestions = [...attemptedQuestions];
    updatedAttemptedQuestions[currentQuestion] = true;
    setAttemptedQuestions(updatedAttemptedQuestions);
    
    // Move to the next question
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === totalQuestions - 1) {
      alert("Submitting the answers");
              handleShowResultClick(true);
    }
    
    
    // Mark the next question as visited
    if (currentQuestion + 1 < quizData.length) {
      const updatedVisitedQuestions = [...visitedQuestions];
      updatedVisitedQuestions[currentQuestion + 1] = true;
      setVisitedQuestions(updatedVisitedQuestions);
    }
  };

 

  const [analysisData, setAnalysisData] = useState(
    Array.from({ length: totalQuestions }, () => ({
      userSelectedOption: null,
      marksObtained: 0,
    }))
  );
  const handleQuizTimeout = () => {
    // Auto-submit the quiz when the timer reaches zero
    setQuizInProgress(false);

    // Calculate and store the analysis data
    const analysis = calculateAnalysis();
    setAnalysisData(analysis);

    // Show the analysis when the quiz times out
    setShowAnalysis(true);
  };
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If it's the last question, show the submit popup
      setShowSubmitPopup(true);
    }
  };
  const handleQuestionNavigation = (index) => {
    setSelectedQuestionIndex(index);
    setCurrentQuestion(index); // Update the current question
  };
  
  return (
    <div className="quiz-app">
      {!quizStarted ? (
        <StartPage onStartQuiz={handleStartQuiz} />
      ) : currentQuestion < quizData.length && quizInProgress ?
        
          (
        <>
          <h1>Quiz</h1>
          <Timer onTimeout={handleQuizTimeout} />
          <QuestionNavigation
            quizData={quizData}
            currentQuestion={currentQuestion}
            onSelectQuestion={handleQuestionNavigation}
          />
                      <Question          onNextQuestionClick={handleNextQuestion}

            question={decodeHtmlEntities(quizData[currentQuestion].question)}
            options={quizData[currentQuestion].options}
            onAnswerClick={handleAnswerClick}
            selectedOptions={userAnswers[currentQuestion] || []} // Ensure selectedOptions is defined
            visitedQuestions={visitedQuestions}
            attemptedQuestions={attemptedQuestions}
            currentQuestionIndex={currentQuestion}
          />
          
          <QuestionNumberBox
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            onQuestionClick={handleQuestionNavigation}
              attemptedQuestions={attemptedQuestions}
              userAnswers={userAnswers}
          />
          {showAnalysis && (
            <Result
                score={score}
                index={currentQuestion}
              totalQuestions={quizData.length}
              email={email}
              quizData={quizData}
              analysisData={analysisData}
            />
          )}
        </>
      ) : (

<Result
score={score}
totalQuestions={quizData.length}
email={email}
quizData={quizData}
analysisData={analysisData}
            /> 
           
            
        )}
      
    </div>
  );
}

export default QuizApp;