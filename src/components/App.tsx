import React from "react";
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook
} from "react-redux";
import { increment } from "../actions";
import Top from "./Top";
import Main from "./Main";
import "./App.css";
import background from "../images/background.jpg";
import { RootState } from "../reducers";

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// useDispatch to dispatch (execute) an action, useSelector to get states
// you have an index file because then it will automatically know how to import, no need for index.TSX files, then.
// probably the way to go is to store the image links as database entry
// also, on a side-note: Have a log-in screen when not signed in. Can still search for people's profiles, though.

function mainStyle(backgroundURL: string) {
  return {
    backgroundColor: "#519674",
    backgroundImage: `url(${backgroundURL})`,
    height: "93%",
    padding: "0",
    margin: "0",
    /* Center and scale the image nicely */
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };
}

const styleSheet = {
  layoutTop: {
    backgroundColor: "black",
    height: "7%",
    padding: "0",
    margin: "0"
  }
};

function App() {
  const bgImage = useSelector(state => state.backgroundImage);
  return (
    <div>
      <div style={styleSheet.layoutTop}>
        {" "}
        <Top></Top>
      </div>
      <div style={mainStyle(bgImage)}>
        <Main></Main>
      </div>
    </div>
  );
}

export default App;
