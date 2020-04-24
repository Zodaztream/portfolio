/**
 * Main Component:
 * Uses React grid layout for customization
 *
 */

import React, { useEffect, createElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { borderColor } from "@material-ui/system";
import StockChart from "./Stockchart";
import "./Main.css";
// This might need to be a component, can't be a component because Hooks. ?

// Put Amount of stockcharts or the div tags in a map, use Map functionality to create all the divs within the gridlayout
// extend width to be the full site width
// perhaps throw props down to Stockchart (the API link to use for to display each stockchart)
// idea is to have a JSON file with these div tags in the database, we'll then parse this data
// also, ensure that when you search for users, they can't edit others' layout. Also, ensure you have to be in "edit"-mode in order to
// add a stockchart (and you can't be in edit-mode for other profiles)
// Create a proper JSON structure for each div tag with data-grid JSX. Loop through the JSON structure and do map with each respective
// JSON element. Also, one JSON elemenet should be which yahoo-finance stockchart to show

interface IState {
  edit: Boolean;
}

interface Storage {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

var tempStorage: Array<Storage> = [
  {
    i: "_1",
    x: 5,
    y: 5, // puts it in the middle
    w: 1,
    h: 2
  }
];

// either predefined, or perhaps later on, we can have a drawer from which you can drag out a "shell/ghost/image" that when dropped will create an element at that grid position
function addItem() {
  tempStorage.push({
    i: "_" + Math.random() * 100,
    x: 5,
    y: 5,
    w: 1,
    h: 2
  });
}

function generateElement(data: Storage) {
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
      <StockChart></StockChart>
    </div>
  );
}

//Question mark regarding this, will react update this element when no setstate is used?
function Main() {
  const isEdit = useSelector<IState>(state => state.edit);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("Updated");
  });

  return (
    <div className={isEdit ? "outline" : ""}>
      <GridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        verticalCompact={false}
        isResizable={isEdit ? true : false}
        isDraggable={isEdit ? true : false}
      >
        {tempStorage.map(generateElement)}
        <div
          key="c"
          style={{
            borderStyle: "dashed",
            borderColor: "white",
            opacity: "1"
          }}
          data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
        >
          <StockChart></StockChart>
        </div>
      </GridLayout>
    </div>
  );
}

export default Main;
