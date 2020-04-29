import React, { useEffect, useState, ReactChild } from "react";
//import { useSelector, useDispatch } from "react-redux";
import ControlPoint from "@material-ui/icons/ControlPoint";
// @ts-ignore
import { TypeChooser } from "react-stockcharts";
import { SizeMe } from "react-sizeme";
import { Element } from "./types";
import { useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { updateElement } from "../actions";
import Chart from "./Chart";
import { getData } from "./chartUtils";
// @ts-ignore
import useDimensions from "react-use-dimensions";
//https://medium.com/@vitalyb/dont-let-typescript-slow-you-down-92d394ec8c9f
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import { DSVParsedArray } from "d3-dsv";

/** LOOK INTO THIS TO FIX THE SLOW TRANSITION.
 *   classes: {
    [toolBarItem: string]: ReactChild;
  };
 */

interface IProps {
  classes: {
    toolBarItem: string;
  };
  chart?: string;
  id: string;
  grid: Element;
}

interface IState {
  show: Boolean;
}

//Alpha Vantage API for stockchart data. 5 minute interval:  IUDORZ4BGIONCWPR , https://www.alphavantage.co/documentation/ (information how to calln)

const styleSheet = (theme: Theme) =>
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
  });

interface IData {
  data: DSVParsedArray<any>;
}

function Stockchart(props: IProps) {
  const [ref, { width, height }] = useDimensions();
  const [choose, setChoose] = useState(false);
  const [chart, setChart] = useState<IData | undefined>(undefined);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  // access grid dimension  by props.grid
  console.log(props.grid.w);

  useEffect(() => {
    //Should take the Chart prop and call the API
    getData().then(data => {
      setChart({ data });
    });
  }, [update]);

  const { classes } = props;
  //We ensure Typescript that chart will have data with "!"
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {choose ? <div></div> : ""}
      {chart ? (
        <div
          ref={ref}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: "100%"
          }}
        >
          <Chart type="svg" data={chart!.data} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          }}
        >
          <div
            className={classes.toolBarItem}
            onClick={() =>
              dispatch(updateElement({ i: props.id, chart: "MSFT" }))
            }
          >
            <ControlPoint
              //onClick = {() => setChoose(true) }
              style={{
                fill: "white",
                height: "5vh",
                width: "5vh"
              }}
            ></ControlPoint>
          </div>
        </div>
      )}
    </div>
  );
}

export default withStyles(styleSheet)(Stockchart);
