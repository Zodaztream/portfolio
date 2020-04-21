import React from "react";
//import { useSelector, useDispatch } from "react-redux";
import ControlPoint from "@material-ui/icons/ControlPoint";
import { textAlign, height } from "@material-ui/system";
import {
  Theme,
  makeStyles,
  withStyles,
  WithStyles,
  fade,
  createStyles
} from "@material-ui/core/styles";

interface IProps {
  classes?: WithStyles<typeof styleSheet>;
}

interface IState {
  show: Boolean;
}

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

class Stockchart extends React.PureComponent<
  WithStyles<typeof styleSheet>,
  IState
> {
  constructor(props: WithStyles<typeof styleSheet>) {
    super(props);

    this.state = {
      show: false
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div style={{ height: "100%" }}>
        {this.state.show ? (
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
}

export default withStyles(styleSheet)(Stockchart);
