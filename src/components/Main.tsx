/**
 * Main Component:
 * Uses React Mosaic for customization
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Mosaic } from "react-mosaic-component";
import "../../node_modules/react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// obviously these div tags will be StockChart component
const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  a: <div style={{ backgroundColor: "white" }}>Left Window</div>,
  b: <div style={{ backgroundColor: "white" }}>Top Right Window</div>,
  c: <div style={{ backgroundColor: "white" }}>Bottom Right Window</div>
};

// There will be components within this which can be moved with React Mosaic
// This might need to be a component ?
function Main() {
  return (
    <Mosaic<string>
      renderTile={id => ELEMENT_MAP[id]}
      initialValue={{
        direction: "row",
        first: "a",
        second: {
          direction: "column",
          first: "b",
          second: "c"
        },
        splitPercentage: 50
      }}
    />
  );
}

export default Main;
