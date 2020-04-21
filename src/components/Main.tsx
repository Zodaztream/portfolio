/**
 * Main Component:
 * Uses React Mosaic for customization
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLayout from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { borderColor } from "@material-ui/system";
import StockChart from "./Stockchart";

// obviously these div tags will be StockChart component

// There will be components within this which can be moved with React Mosaic
// This might need to be a component ?
// Each div in the gridlayout will be saved
function Main() {
  return (
    <GridLayout
      className="layout"
      cols={12}
      rowHeight={30}
      width={1200}
      verticalCompact={false}
    >
      <div
        key="a"
        style={{ backgroundColor: "white", opacity: "0.5" }}
        data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}
      >
        <div>
          <StockChart></StockChart>
        </div>
      </div>
      <div
        key="b"
        style={{ backgroundColor: "white" }}
        data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }}
      >
        b
      </div>
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
  );
}

export default Main;
