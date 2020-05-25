import React from "react";
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook
} from "react-redux";
import { setMessage } from "../actions";
import Top from "./Top";
import Main from "./Main";
import "./App.css";
import background from "../images/background.jpg";
import { RootState } from "../reducers";
import {
  Theme,
  makeStyles,
  fade,
  createStyles
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// useDispatch to dispatch (execute) an action, useSelector to get states
// you have an index file because then it will automatically know how to import, no need for index.TSX files, then.
// probably the way to go is to store the image links as database entry
// also, on a side-note: Have a log-in screen when not signed in. Can still search for people's profiles, though.

function mainStyle(backgroundURL: string) {
  return {
    backgroundColor: "#557A95",
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

const styleSheet = makeStyles((theme: Theme) =>
  createStyles({
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute" as "absolute",
      zIndex: 9999,
      display: "flex",
      alignItems: "center" as "center",
      justifyContent: "center" as "center"
    },
    layoutTop: {
      backgroundColor: "#FFFCF5",
      height: "7%",
      padding: "0",
      margin: "0"
    },
    messageBar: {
      zIndex: 9999,
      position: "absolute" as "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      opacity: "0.5",
      transitionTimingFunction: "ease-in",
      transition: "0.2s",
      transform: "translateY(130%)"
    },
    messageBarShow: {
      display: "flex",
      zIndex: 9999,
      position: "absolute" as "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      opacity: "0.5",
      alignItems: "center",
      justifyContent: "center",
      transitionTimingFunction: "ease-out",
      transition: "0.25s",
      transform: "translateY(0)"
    }
  })
);

function App() {
  const bgImage = useSelector(state => state.backgroundImage);
  const showAccountMenu = useSelector(state => state.toggleAccountMenu);
  const globalMessage = useSelector(state => state.globalMessage);
  const dispatch = useDispatch();
  const classes = styleSheet();

  return (
    <div>
      <div
        className={showAccountMenu ? "blur_behind" : ""}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "absolute"
        }}
      >
        <div className={classes.layoutTop}>
          {" "}
          <Top></Top>
        </div>
        <div style={mainStyle(bgImage)}>
          <Main></Main>
        </div>
      </div>
      <div
        style={{
          overflow: "hidden",
          height: "100%",
          width: "100%",
          position: "absolute"
        }}
      >
        <div
          className={
            globalMessage.message ? classes.messageBarShow : classes.messageBar
          }
          style={{ backgroundColor: globalMessage.error ? "green" : "red" }}
        >
          {globalMessage.message ? (
            <IconButton onClick={() => dispatch(setMessage("", false))}>
              <Close></Close>
            </IconButton>
          ) : (
            ""
          )}
          {globalMessage.message ? globalMessage.message : ""}
          &nbsp;
        </div>
      </div>
    </div>
  );
}

export default App;
