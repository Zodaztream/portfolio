import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateElement } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ExitToApp from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { updateBackground } from "../actions";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    flex: 1,
    padding: 5
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
});

type IProps = {
  onChoose: (value: boolean) => void;
};

function BgSelector(props: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [bg, setBg] = useState("");
  // Have a canvas component or something similar to draw a connection between the components. Maybe using hooks?
  return (
    // might move display flex, flex , etc etc up one level, otherwise it's messy with a lot of sub divs
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter image URL..."
        onChange={event => setBg(event.target.value)}
      ></InputBase>
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => dispatch(updateBackground(bg))}
      >
        <SearchIcon></SearchIcon>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical"></Divider>
      <IconButton
        className={classes.iconButton}
        onClick={() => props.onChoose(false)}
      >
        <ExitToApp></ExitToApp>
      </IconButton>
    </Paper>
  );
}

export default BgSelector;
