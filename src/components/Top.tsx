import React, { CSSProperties, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findByLabelText } from "@testing-library/dom";
import SearchIcon from "@material-ui/icons/Search";
import AccountBox from "@material-ui/icons/AccountBox";
import Close from "@material-ui/icons/Close";
import Create from "@material-ui/icons/Create";
import InputBase from "@material-ui/core/InputBase";
import { useModal } from "react-modal-hook";
import { edit, toggleAccountMenu } from "../actions";
import AccountMenu from "./AccountMenu";
import {
  Theme,
  makeStyles,
  fade,
  createStyles
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { handleLogout, handleSearch, getProfile } from "./Network";
import { Element } from "./types";
import { addElement } from "../actions";
import IconButton from "@material-ui/core/IconButton";

// actually might need a local state for typing in a name an
// takeaway, use makeStyles in conjunction with CreateStyles and then use "className" instead of "style" as prop.
// perhaps move these into its own file and do export default (much like actions) and then perhaps reach the sytles by {style} from ..., maybe need to do that in an index file!
const styleSheet = makeStyles((theme: Theme) =>
  createStyles({
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute" as "absolute",
      pointerEvents: "none" as "none",
      display: "flex",
      alignItems: "center" as "center",
      justifyContent: "center" as "center"
    },

    inputRoot: {
      //color: "inherit"
      color: "inherit"
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      //vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    },

    search: {
      position: "relative" as "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },

    toolBarItem: {
      display: "flex",
      flex: "1",
      width: "100%",
      height: "100%",
      justifyContent: "flexEnd",
      alignItems: "center" as "center",
      opacity: 0.5,
      transition: theme.transitions.create(["backgroundColor", "opacity"], {
        duration: theme.transitions.duration.complex
      }),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        opacity: 1
      }
    }
  })
);

const styleSheet_outside = {
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#C0C1C1",
    flexDirection: "row" as "row"
  },
  searchBar: {
    margin: "0.5% 0.5% 0.5% 1%",
    display: "flex",
    flex: "5",
    justifyContent: "flexStart",
    alignItems: "center" as "center",
    backgroundColor: "white"
  },

  toolBar: {
    display: "flex",
    flex: "1",
    backgroundColor: "teal"
    // might be cool to have hover and fade : look at styleSheet as reference"
  },

  toolBarIcon: {
    display: "flex",
    flex: "1",
    fill: "white",
    height: "75%",
    width: "20%"
  }
};

function Top() {
  // move this to its own AccountMenuComponent, update the redux state approprtiately
  const [showAccountModal, hideAccountModal] = useModal(() => (
    <AccountMenu onClose={hideAccountModal} />
  ));
  const [search, setSearch] = useState("");
  const classes = styleSheet();
  const dispatch = useDispatch();

  return (
    <div style={styleSheet_outside.mainContainer}>
      <div style={styleSheet_outside.searchBar}>
        <div className={classes.search}>
          <IconButton
            onClick={() => {
              getProfile(search).then(elements => {
                if (elements) {
                  elements.map((obj: Element) => {
                    dispatch(addElement(obj));
                  });
                }
              });
            }}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            onChange={event => setSearch(event.currentTarget.value)}
            //onChange, set the local state
          />
        </div>
      </div>
      <div style={styleSheet_outside.toolBar}>
        <div
          className={classes.toolBarItem}
          onClick={() => {
            // guess is that onExited is only provided by material ui
            dispatch(toggleAccountMenu());
            showAccountModal();
          }}
        >
          <AccountBox style={styleSheet_outside.toolBarIcon} />
        </div>
        <div
          className={classes.toolBarItem}
          onClick={() => {
            dispatch(edit());
          }}
        >
          <Create style={styleSheet_outside.toolBarIcon} />
        </div>
        <div className={classes.toolBarItem} onClick={() => handleLogout()}>
          <Close style={styleSheet_outside.toolBarIcon} />
        </div>
      </div>
    </div>
  );
}

export default Top;
