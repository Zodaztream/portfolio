/**
 * Stockpicker components:
 * Displays the component which allows the user
 * to set the stock symbol for that component
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateElement } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ExitToApp from "@material-ui/icons/ExitToApp";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

type IProps = {
  id: string;
  onChoose: (value: boolean) => void;
};

/**
 * @description Displays MUI card with a search bar, exit button and an apply button to update a chart in the store
 * @returns Component to render
 */
function StockPicker(props: IProps) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="Exit" onClick={() => props.onChoose(false)}>
              <ExitToApp />
            </IconButton>
          }
          title={
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Select {bull} Chart
            </Typography>
          }
        />
        <CardContent>
          <TextField
            id="standard-basic"
            label="Tag"
            onChange={event => setTag(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={() => dispatch(updateElement({ i: props.id, chart: tag }))}
            size="small"
          >
            Apply
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default StockPicker;
