/**
 * Main Component:
 * Displays a customizable grid layout with grid elements
 */

import React, { useState, useEffect, useRef } from "react";

import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch
} from "react-redux";
import GridLayout, { WidthProvider, Layout } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import StockChart from "./Stockchart";
import "./Main.css";
import Add from "@material-ui/icons/Add";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import {
  addElement,
  updateSizePos,
  updateBackground,
  clearAllElements,
  setMessage
} from "../actions";
import { RootState } from "../reducers";
import { Element, DataArray, ResponseType } from "./types";
import BgSelector from "./BgSelector";
import { useModal } from "react-modal-hook";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { ParsedPath } from "path";
import { getProfile, handleProfileUpdate } from "./Network";

const ReactGridLayout = WidthProvider(GridLayout);

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const styleSheet = makeStyles((theme: Theme) =>
  createStyles({
    toolBarItem: {
      opacity: 0.5,
      transition: theme.transitions.create(["opacity"], {
        duration: theme.transitions.duration.complex
      }),
      "&:hover": {
        //backgroundColor: fade(theme.palette.common.white, 0.25),
        opacity: 1
      }
    }
  })
);

// either predefined, or perhaps later on, we can have a drawer from which you can drag out a "shell/ghost/image" that when dropped will create an element at that grid position
function addItem() {
  return {
    i: "_" + Math.random() * 100,
    x: 5,
    y: 5,
    w: 5,
    h: 8,
    chart: ""
  };
}

/**
 * @description Creates a grid element from given data
 * @params data: Element - grid element data
 * @returns Component to render
 */
function generateElement(data: Element) {
  return (
    <div
      key={data.i}
      style={{
        borderStyle: "dashed",
        borderColor: "white",
        opacity: "1"
      }}
      data-grid={{ x: data.x, y: data.y, w: data.w, h: data.h }}
    >
      <StockChart id={data.i} chart={data.chart} grid={data}></StockChart>
    </div>
  );
}

//Move out "isEdit" too its own "toolbar" return function

/**
 * @description Displays react grid layout and its grid components
 * @returns Element to render
 */
function Main() {
  const isEdit = useSelector(state => state.edit);
  const isSearching = useSelector(state => state.isSearching);
  const elements = useSelector(state => state.elements.elements);
  const background = useSelector(state => state.backgroundImage);
  const [showbg, setShowbg] = useState(false);
  const classes = styleSheet();
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  // Prompts the user to save post editting
  const [showSave, hideSave] = useModal(
    () => (
      <Dialog open={true} onClose={hideSave}>
        <DialogTitle>Save?</DialogTitle>
        <DialogContent>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              //maybe do loading circle
              if (elements) {
                handleProfileUpdate(elements, background);
              }
              hideSave();
            }}
            style={{ margin: 4 }}
          >
            Yes
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              hideSave();
            }}
            style={{ margin: 4 }}
          >
            No
          </Button>
        </DialogContent>
      </Dialog>
    ),
    [elements, background]
  );

  // Fetches the profile data from the server/DB and applies it.
  const showProfile = () => {
    getProfile("").then((response: ResponseType | void) => {
      console.log(response);
      if (response) {
        if (response.success) {
          const { elements, background }: DataArray = JSON.parse(response.data);
          elements.map((obj: Element) => {
            dispatch(addElement(obj));
          });
          dispatch(updateBackground(background));
        } else {
          dispatch(setMessage(response.message, false));
        }
      }
    });
  };

  //This takes care off what should happen post editting
  useEffect(() => {
    //Must check that is not the first run, otherwise, this will fire.
    if (!isEdit && !firstRun.current) {
      showSave();
    }
  }, [isEdit]);

  //This will happen only once, on the first mount
  //useEffect(() => {
  //  showProfile();
  //  firstRun.current = false;
  //}, []);

  // This takes care of what should happen when we're no longer searching (i.e returned home) and on page refresh.
  useEffect(() => {
    if (!isSearching) {
      dispatch(clearAllElements()); //empty the state
      firstRun.current = false;
      console.log("Showing the profile");
      showProfile();
    }
  }, [isSearching]);

  // onResizeStop, onDragStop => dispatch to state and update state, because we get the elements from the state.
  // however, nmight cause a loop.

  return (
    <div className={isEdit ? "outline" : ""}>
      <ReactGridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        compactType={null}
        isResizable={isEdit ? true : false}
        isDraggable={isEdit ? true : false}
        onResizeStop={(
          layout: Layout[],
          oldLayout: Layout,
          newLayout: Layout
        ) => {
          var element: Element = {
            i: newLayout.i,
            x: newLayout.x,
            y: newLayout.y,
            w: newLayout.w,
            h: newLayout.h
          };
          dispatch(updateSizePos(element));
          window.dispatchEvent(new Event("resize"));
        }}
      >
        {isEdit ? ( // Edit bar
          <div
            key="ADD"
            className={classes.toolBarItem}
            onClick={() => dispatch(addElement(addItem()))}
            data-grid={{ x: 0, y: 0, w: 0, h: 0, static: true }}
          >
            <Add
              style={{
                fill: "white",
                height: "5vh",
                width: "5vh"
              }}
            ></Add>
          </div>
        ) : (
          <div key="ADD" data-grid={{ x: 0, y: 0, w: 0, h: 0, static: true }} />
        )}
        {isEdit ? (
          <div
            key="EDIT_BG"
            className={classes.toolBarItem}
            onClick={() => setShowbg(true)}
            data-grid={{ x: 0, y: 1, w: 0, h: 0, static: true }}
          >
            <AddPhotoAlternate
              style={{
                fill: "white",
                height: "5vh",
                width: "5vh"
              }}
            ></AddPhotoAlternate>
          </div>
        ) : (
          <div
            key="EDIT_BG"
            data-grid={{ x: 0, y: 1, w: 0, h: 0, static: true }}
          />
        )}

        {showbg ? (
          <div key="BG_MENU" data-grid={{ x: 0.5, y: 1, w: 0, h: 0 }}>
            <BgSelector onChoose={setShowbg}></BgSelector>
          </div>
        ) : (
          <div
            key="BG_MENU"
            data-grid={{ x: 0.5, y: 1, w: 0, h: 0, static: true }}
          />
        )}
        {Object.keys(elements).map(key => generateElement(elements[key]))}
      </ReactGridLayout>
    </div>
  );
}

export default Main;
