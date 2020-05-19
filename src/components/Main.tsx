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
import { addElement, updateSizePos, updateBackground } from "../actions";
import { RootState } from "../reducers";
import { Element } from "./types";
import BgSelector from "./BgSelector";
import { useModal } from "react-modal-hook";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { ParsedPath } from "path";
import { getProfile } from "./Network";

const ReactGridLayout = WidthProvider(GridLayout);

// perhaps throw props down to Stockchart (the $TAG (e.g. MSFT) link to use for to display each stockchart)
// idea is to have a JSON file with these div tags in the database, we'll then parse this data
// also, ensure that when you search for users, they can't edit others' layout. Also, ensure you have to be in "edit"-mode in order to
// add a stockchart (and you can't be in edit-mode for other profiles)
// Create a proper JSON structure for each div tag with data-grid JSX. Loop through the JSON structure and do map with each respective
// JSON element. Also, one JSON elemenet should be which yahoo-finance stockchart to show
// Save button ?

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
  console.log({ i: data.i, w: data.w, t: "HELLO" });
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

// { elements: { [id: string]: Element }; background: string }
// Actually, we might actually have to have local states, as when you type in someone's name. you Obviously don't want old data.
// but at least I learned something new :)
//Move out "isEdit" too its own "toolbar" return function

/**
 * @description Displays react grid layout and its grid components
 * @returns Element to render
 */
function Main() {
  const isEdit = useSelector(state => state.edit);
  const elements = useSelector(state => state.elements.elements);
  const [showbg, setShowbg] = useState(false);
  const classes = styleSheet();
  const dispatch = useDispatch();
  const firstRun = useRef(true);

  const [showSave, hideSave] = useModal(() => (
    //perform call server -> insert DB
    <Dialog open={true} onClose={hideSave}>
      <DialogTitle>Save?</DialogTitle>
      <DialogContent>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            //maybe do loading circle
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
  ));

  useEffect(() => {
    if (!isEdit && !firstRun.current) {
      showSave();
    } else if (firstRun) {
      //On first run.
      getProfile("").then(elements => {
        if (elements) {
          elements.map((obj: Element) => {
            dispatch(addElement(obj));
          });
        }
      });

      firstRun.current = false;
    }
  }, [isEdit]);

  // onResizeStop, onDragStop => dispatch to state and update state, because we get the elements from the state.
  // however, nmight cause a loop.

  return (
    <div className={isEdit ? "outline" : ""}>
      <ReactGridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        verticalCompact={false}
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
            onClick={() => setShowbg(true)} //Dispatch for now, but will open up a separate menu in which we paste the link
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
