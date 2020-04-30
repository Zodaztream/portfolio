/**
 * Stockchart component:
 * Displays an intra day, continous, candle stick chart if stock-name is provided
 */

import React, { useEffect, useState, ReactChild } from "react";
//import { useSelector, useDispatch } from "react-redux";
import ControlPoint from "@material-ui/icons/ControlPoint";
// @ts-ignore
import { Element } from "./types";
import { useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { updateElement } from "../actions";
import Chart from "./Chart";
import { getData } from "./chartUtils";
// @ts-ignore
//https://medium.com/@vitalyb/dont-let-typescript-slow-you-down-92d394ec8c9f
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import { DSVParsedArray } from "d3-dsv";
import StockPicker from "./StockPicker";

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

//Type for fetched data
interface IData {
  data: DSVParsedArray<any>;
}

/** LOOK INTO THIS TO FIX THE SLOW TRANSITION.
 *   classes: {
    [toolBarItem: string]: ReactChild;
  };
 */

// Types for possible props
interface IProps {
  classes: {
    toolBarItem: string;
  };
  chart?: string; //The tag of the data to show e.g. "MSFT", "TSLA", "AMD"
  id: string;
  grid: Element;
}

/**
 * @description Allows to choose data to display and displays a Candle stick chart for continous intra day.
 * @params props: IProps - the properties this function component may take, see IProps
 *  for more info
 * @returns render - the component to render
 */
function Stockchart(props: IProps) {
  const [choose, setChoose] = useState(false);
  const [chart, setChart] = useState<IData | undefined>(undefined);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  console.log(choose);

  useEffect(() => {
    //Should take the Chart prop and call the API
    if (props.chart) {
      getData().then(data => {
        setChart({ data });
      });
      setChoose(false);
    }
  }, [update, props.chart]);

  const { classes } = props;
  //We ensure Typescript that chart will have data with "!"
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {chart ? (
        <div
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
      ) : choose ? (
        <StockPicker id={props.id} />
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
          <div className={classes.toolBarItem}>
            <ControlPoint
              onClick={() => setChoose(true)}
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
