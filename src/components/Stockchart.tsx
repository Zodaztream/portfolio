import React, { useEffect, useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
import ControlPoint from "@material-ui/icons/ControlPoint";
// @ts-ignore
import { TypeChooser } from "react-stockcharts";
import { Element } from "./types";
import { useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { updateElement } from "../actions";

//https://medium.com/@vitalyb/dont-let-typescript-slow-you-down-92d394ec8c9f
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

interface IProps {
  classes: {
    toolBarItem: string;
  };
  chart?: string;
  id: string;
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

function Stockchart(props: IProps) {
  const [choose, setChoose] = useState(false);

  const dispatch = useDispatch();
  const { classes } = props;
  return (
    <div style={{ height: "100%" }}>
      {choose ? <div></div> : ""}
      {props.chart ? (
        <div>{/** this.props.*/}</div>
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
              //onClick = {() => setChoose(true) }
              onClick={() =>
                dispatch(updateElement({ i: props.id, chart: "MSFT" }))
              }
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
