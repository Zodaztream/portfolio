/**
 * Stockchart component:
 * Displays an intra day, continous, candle stick chart if stock-name is provided
 */

import React, { useEffect, useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
import ControlPoint from "@material-ui/icons/ControlPoint";
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { Element, DataExceeded } from "./types";
import {
  useDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from "react-redux";
import { removeElement, setMessage } from "../actions";
import Chart from "./Chart";
import { getData } from "./chartUtils";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import { DSVParsedArray } from "d3-dsv";
import StockPicker from "./StockPicker";
import { RootState } from "../reducers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

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
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -62,
      marginLeft: -62
    }
  });

//Type for fetched data
interface IData {
  data: DSVParsedArray<any>;
}

// Types for possible props
interface IProps {
  classes: {
    toolBarItem: string;
    buttonProgress: string;
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
  const [loading, setLoading] = useState(false);
  const timer = React.useRef<number>();
  const dispatch = useDispatch();
  const isEdit = useSelector(state => state.edit);

  const updateChoose = (value: boolean) => {
    setChoose(value);
  };

  /**
   * @description This function will retrieve the parsed response from the Network fetch to the API
   * And if the data is valid, then the data for this stockchart will be applied.
   */
  const tryChart = (chart: string) => {
    setLoading(true);
    getData(chart).then(data => {
      if ((data as DataExceeded).success !== undefined) {
        if ((data as DataExceeded).type === "exhausted") {
          dispatch(
            setMessage(
              "The allowed amount off API calls have been exceeded. This will resolve itself after some time ",
              false
            )
          );
          // perform another try
          timer.current = window.setTimeout(() => {
            tryChart(chart);
          }, 60000);
        } else if ((data as DataExceeded).type === "error") {
          setLoading(false);
          dispatch(
            setMessage(
              "Sorry, the TAG you asked for does not exist, please try another",
              true
            )
          );
        } else {
          setLoading(false);
          dispatch(
            setMessage(
              "Sorry, empty Data. If you are trying to access NASDAQ data, it sometimes return old data. Try another time.",
              true
            )
          );
        }
      } else {
        setLoading(false);
        setChart({ data: data as DSVParsedArray<any> });
      }
    });
    setChoose(false);
  };
  //This is called when it has received a chart.
  useEffect(() => {
    if (props.chart) {
      tryChart(props.chart);
    }
  }, [update, props.chart]);

  const { classes } = props;
  //We ensure Typescript that chart will have data with "!"
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {isEdit ? (
        <IconButton
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 9999
          }}
          onClick={() => dispatch(removeElement(props.grid))}
        >
          <Clear></Clear>
        </IconButton>
      ) : (
        ""
      )}

      {loading && (
        <CircularProgress size={124} className={classes.buttonProgress} />
      )}

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
          <Chart type="svg" data={chart!.data} id={props.id} />
        </div>
      ) : choose ? (
        <StockPicker id={props.id} onChoose={updateChoose} />
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
            {!loading && (
              <ControlPoint
                onClick={() => setChoose(true)}
                style={{
                  fill: "white",
                  height: "5vh",
                  width: "5vh"
                }}
              ></ControlPoint>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default withStyles(styleSheet)(Stockchart);
