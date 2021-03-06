/**
 * Background selector component:
 * Displays the selector in which a user may
 * add a background-img url
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExitToApp from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
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

/**
 * @description Displays and handles the menu for the background selector
 */
function BgSelector(props: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [bg, setBg] = useState("");
  return (
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
