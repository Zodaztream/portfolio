import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../actions";
import Top from "./Top";
import Main from "./Main";
// useDispatch to dispatch (execute) an action, useSelector to get states
// you have an index file because then it will automatically know how to import, no need for index.TSX files, then.

interface StateProps {
  counter: number;
}

const styleSheet = {
  layoutTop: {
    backgroundColor: "black",
    height: "7%",
    padding: "0",
    margin: "0"
  },
  layoutMain: {
    backgroundColor: "#519674",
    height: "93%",
    padding: "0",
    margin: "0"
  }
};

function App() {
  //extracting counter for instance
  const counter = useSelector<StateProps>(state => state.counter);
  const dispatch = useDispatch();
  //() => dispatch(increment()) to dispatch this action.
  return (
    <div>
      <div style={styleSheet.layoutTop}>
        {" "}
        <Top></Top>
      </div>
      <div style={styleSheet.layoutMain}>
        <Main></Main>
      </div>
    </div>
  );
}

export default App;
