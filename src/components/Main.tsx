/**
 * Main Component:
 * Uses React grid layout for customization
 *
 */

import React, { useEffect } from "react";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch
} from "react-redux";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { borderColor } from "@material-ui/system";
import StockChart from "./Stockchart";
import "./Main.css";
import Add from "@material-ui/icons/Add";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { addElement } from "../actions";
import { RootState } from "../reducers";
import { Element } from "./types";
// This might need to be a component, can't be a component because Hooks. ?

// Put Amount of stockcharts or the div tags in a map, use Map functionality to create all the divs within the gridlayout
// extend width to be the full site width
// perhaps throw props down to Stockchart (the API link to use for to display each stockchart)
// idea is to have a JSON file with these div tags in the database, we'll then parse this data
// also, ensure that when you search for users, they can't edit others' layout. Also, ensure you have to be in "edit"-mode in order to
// add a stockchart (and you can't be in edit-mode for other profiles)
// Create a proper JSON structure for each div tag with data-grid JSX. Loop through the JSON structure and do map with each respective
// JSON element. Also, one JSON elemenet should be which yahoo-finance stockchart to show
// Save button ?

//LOcal states do work: Must use useState instead for funcion components: https://reactjs.org/docs/hooks-state.html

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
    w: 1,
    h: 2
  };
}

function generateElement(data: Element) {
  console.log({ i: data.i, h: data.h, t: "HELLO" });
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
      <StockChart id="2"></StockChart>
    </div>
  );
}

// Actually, we might actually have to have local states, as when you type in someone's name. you Obviously don't want old data.
// but at least I learned something new :)
//Question mark regarding this, will react update this element when no setstate is used?
function Main() {
  const isEdit = useSelector(state => state.edit);
  const elements = useSelector(state => state.elements.elements);
  const classes = styleSheet();
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    console.log("Updated");
  });

  return (
    <div className={isEdit ? "outline" : ""}>
      {isEdit ? (
        <div
          className={classes.toolBarItem}
          onClick={() => dispatch(addElement(addItem()))}
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
        ""
      )}

      <GridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        verticalCompact={false}
        isResizable={isEdit ? true : false}
        isDraggable={isEdit ? true : false}
      >
        {Object.keys(elements).map(key => generateElement(elements[key]))}
        <div
          key="c"
          style={{
            borderStyle: "dashed",
            borderColor: "white",
            opacity: "1"
          }}
          data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
        >
          <StockChart id="2"></StockChart>
        </div>
      </GridLayout>
    </div>
  );
}

export default Main;
