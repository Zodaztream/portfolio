/**
 * App component:
 * This is the highest component in the component hiearchy. This component
 * Splits into its children: Main and Top
 */
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
import { RootState } from "../reducers";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

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

/**
 * @description This is the main functional components, it contains the
 * Topbar (Top) , Mainbar(Main) and displays the global message.
 */
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
          width: "100%",
          height: "10%",
          position: "absolute",
          bottom: 0
        }}
      >
        <div
          className={
            globalMessage.message ? classes.messageBarShow : classes.messageBar
          }
          style={{
            backgroundColor: globalMessage.error ? "red" : "green"
          }}
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
