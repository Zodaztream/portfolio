/**
 * Main Component:
 * Uses React grid layout for customization
 *
 */

import React, { useEffect } from "react";
import createReactClass from "create-react-class";
//@ts-ignore

import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch
} from "react-redux";
import GridLayout, { WidthProvider, Layout } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { borderColor } from "@material-ui/system";
import StockChart from "./Stockchart";
import "./Main.css";
import Add from "@material-ui/icons/Add";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { addElement, updateSizePos } from "../actions";
import { RootState } from "../reducers";
import { Element } from "./types";

const ReactGridLayout = WidthProvider(GridLayout);
// This might need to be a component, can't be a component because Hooks. ?

// perhaps throw props down to Stockchart (the $TAG (e.g. MSFT) link to use for to display each stockchart)
// idea is to have a JSON file with these div tags in the database, we'll then parse this data
// also, ensure that when you search for users, they can't edit others' layout. Also, ensure you have to be in "edit"-mode in order to
// add a stockchart (and you can't be in edit-mode for other profiles)
// Create a proper JSON structure for each div tag with data-grid JSX. Loop through the JSON structure and do map with each respective
// JSON element. Also, one JSON elemenet should be which yahoo-finance stockchart to show
// Save button ?

//LOcal states do work: Must use useState instead for funcion components: https://reactjs.org/docs/hooks-state.html

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

type Props = {
  onLayoutChange?: (layout: Layout[]) => void;
};

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

// Actually, we might actually have to have local states, as when you type in someone's name. you Obviously don't want old data.
// but at least I learned something new :)
//Question mark regarding this, will react update this element when no setstate is used?
//Move out "isEdit" too its own "toolbar" return function
function Main(props: Props) {
  const isEdit = useSelector(state => state.edit);
  const elements = useSelector(state => state.elements.elements);
  const classes = styleSheet();
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    console.log("Updated");
  });

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
          window.dispatchEvent(new Event("resize"));
          dispatch(updateSizePos(element));
        }}
      >
        {isEdit ? (
          <div
            key="ADD"
            className={classes.toolBarItem}
            onClick={() => dispatch(addElement(addItem()))}
            data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }}
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
          <div key="ADD" data-grid={{ x: 0, y: 0, w: 1, h: 1, static: true }} />
        )}
        {Object.keys(elements).map(key => generateElement(elements[key]))}
      </ReactGridLayout>
    </div>
  );
}

export default Main;
