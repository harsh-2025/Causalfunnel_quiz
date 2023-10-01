
// import React from 'react';
// import ReactDOM from 'react-dom';
// import "./index.css";

// import App from './App'; // Your main component
// import { Route, BrowserRouter as Router } from 'react-router-dom';
// import { createRoot } from 'react-dom';

// // ReactDOM.render(
// //   <Router>
// //     <App />
// //   </Router>,
// //   document.getElementById('root')
// // );
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import "./index.css";

const root = createRoot(document.getElementById('root'));
root.render(<App />);