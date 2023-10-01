import React, { useState } from "react";
import "../styles/startpage.css"
function StartPage({ onStartQuiz }) {
  const [email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the email address if needed
    if (email.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }
    // setShowLoader(true);
    
    
      onStartQuiz(email);

   
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Start Quiz</button>
      </form>
      {/* {showLoader && <div className="loader"></div>} Display loader if showLoader is true */}

      <div class="rules-container">
  <h1>Rules</h1>
  <ul>
    <li>This quiz has a total of 15 questions.</li>
    <li>Chosen options will be colored blue, and the question number will turn green once an option is clicked.</li>
    <li>The quiz will auto-submit after 30 minutes.</li>
    <li>Before choosing the last question's option, you should answer all previous questions.</li>
    <li>Upon selecting an option for the last question, the quiz will alert you to submit your answers and redirect to the result and analysis of your attempt.</li>
  </ul>
</div>

    </div>
  );
}

export default StartPage;
