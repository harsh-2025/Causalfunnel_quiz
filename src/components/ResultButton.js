import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function ResultButton() {
  return (
    <Link to="/result"> {/* Use Link to navigate to the "/result" route */}
      <button className="result-button">Result</button>
    </Link>
  );
}

export default ResultButton;
