import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BurgerMenu from "../burgerMenu/burger";
import withSuspence from "../hoc/withSuspence";
import "./app.scss";

const Memory = React.lazy(() => import("memorySubApp/memory"));
const LetterHummer = React.lazy(() => import("lettersSubApp/letterHummer"));

const App = () => {
  return (
    <Router>
      <BurgerMenu />

      <Route path="/" exact component={withSuspence(Memory)} />
      <Route path="/memory" component={withSuspence(Memory)} />
      <Route path="/letterhummer" component={withSuspence(LetterHummer)} />
    </Router>
  );
};

export default App;
