import React from "react";
import "./App.css";
import QuizApp from "./components/QuizApp";
import Result from "./components/Result";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <QuizApp />
    </div>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import QuizApp from '..src/comp/QuizApp'; // Replace with the path to your QuizApp component
// import QuizApp from './components/QuizApp';
// // import Result from './Result'; // Replace with the path to your Result component
// import Result from './components/Result';

// function App() {
//   return (
//     <Router>
//       {/* <Switch> */}
//         <Route path="/" exact component={QuizApp} />
//         <Route path="/result" component={Result} />
//       {/* </Switch> */}
//     </Router>
//   );
// }

// export default App;
