import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../actions";
// useDispatch to dispatch (execute) an action, useSelector to get states
// you have an index file because then it will automatically know how to import, no need for index.TSX files, then.

interface StateProps {
  counter: number;
}

function App() {
  //extracting counter for instance
  const counter = useSelector<StateProps>(state => state.counter);
  const dispatch = useDispatch();
  //() => dispatch(increment()) to dispatch this action.
  return (
    <div className="App">
      <h1>Counter {counter}</h1>
    </div>
  );
}

export default App;
