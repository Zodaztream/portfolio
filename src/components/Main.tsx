/**
 * Main Component:
 * Uses React grid layout for customization
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { borderColor } from "@material-ui/system";
import StockChart from "./Stockchart";
import "./Main.css";
import { ListItemSecondaryAction } from "@material-ui/core";

// This might need to be a component ?

// Put Amount of stockcharts or the div tags in a map, use Map functionality to create all the divs within the gridlayout
// extend width to be the full site width
// perhaps throw props down to Stockchart (the API link to use for to display each stockchart)
// idea is to have a JSON file with these div tags in the database, we'll then parse this data
// also, ensure that when you search for users, they can't edit them. Also, ensure you have to be in "edit"-mode in order to
// add a stockchart
const testMap = [
  <div
    key="a"
    style={{ backgroundColor: "white", opacity: "0.5" }}
    data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}
  >
    <div>
      <StockChart></StockChart>
    </div>
  </div>,
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
  </div>,
  <div
    key="b"
    style={{ backgroundColor: "white" }}
    data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }}
  >
    b
  </div>
];

interface type {
  edit: Boolean;
}

function Main() {
  const isEdit = useSelector<type>(state => state.edit);

  return (
    <div className={isEdit ? "outline" : ""}>
      <GridLayout
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        verticalCompact={false}
        isDraggable={isEdit ? true : false}
        isResizable={isEdit ? true : false}
      >
        {testMap.map(data => data)}
      </GridLayout>
    </div>
  );
}

export default Main;
