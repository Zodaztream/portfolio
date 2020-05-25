import React, { CSSProperties, useState } from "react";
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook
} from "react-redux";
import { findByLabelText } from "@testing-library/dom";
import SearchIcon from "@material-ui/icons/Search";
import AccountBox from "@material-ui/icons/AccountBoxOutlined";
import Close from "@material-ui/icons/CloseOutlined";
import Create from "@material-ui/icons/CreateOutlined";
import InputBase from "@material-ui/core/InputBase";
import { useModal } from "react-modal-hook";
import {
  edit,
  toggleAccountMenu,
  clearAllElements,
  setMessage
} from "../actions";
import AccountMenu from "./AccountMenu";
import {
  Theme,
  makeStyles,
  fade,
  createStyles
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { handleLogout, getProfile, handlePing } from "./Network";
import { Element, DataArray } from "./types";
import { addElement, setSearching, updateBackground } from "../actions";
import IconButton from "@material-ui/core/IconButton";
import { RootState } from "../reducers";
import clsx from "clsx";

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// actually might need a local state for typing in a name an
// takeaway, use makeStyles in conjunction with CreateStyles and then use "className" instead of "style" as prop.
// perhaps move these into its own file and do export default (much like actions) and then perhaps reach the sytles by {style} from ..., maybe need to do that in an index file!
const styleSheet = makeStyles((theme: Theme) =>
  createStyles({
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute" as "absolute",
      zIndex: 9999,
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
      },
      zIndex: 9999,
      WebkitBoxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
      mozBoxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
      boxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`
    },

    toolBarEnabled: {
      display: "flex",
      flex: "1",
      width: "100%",
      height: "100%",
      position: "relative",
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
    },
    toolBarDisabled: {
      display: "flex",
      position: "relative",
      flex: "1",
      width: "100%",
      height: "100%",
      justifyContent: "flexEnd",
      alignItems: "center" as "center",
      opacity: 0.5,
      background: "#800000"
    },
    toolBarIcon: {
      display: "flex",
      flex: "1",
      height: "75%",
      width: "20%"
    }
  })
);

const styleSheet_outside = {
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#B1A296"
  },
  searchBar: {
    display: "flex",
    flex: "5",
    justifyContent: "flexStart",
    alignItems: "center" as "center",
    backgroundColor: "#B1A296",
    WebkitBoxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
    MozBoxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
    boxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`
  },

  toolBar: {
    display: "flex",
    flex: "1",
    backgroundColor: "#B1A296",
    WebkitBoxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
    MozBoxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
    boxShadow: `0px 10px 20px 0px rgba(0,0,0,0.25)`,
    zIndex: 9999
    // might be cool to have hover and fade : look at styleSheet as reference"
  },

  toolBarIcon: {
    display: "flex",
    flex: "1",
    fill: "white",
    height: "75%",
    width: "20%"
  },

  toolBarIconPrevent: {
    display: "flex",
    position: "absolute" as "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    flex: "1"
  }
};

function Top() {
  const [showAccountModal, hideAccountModal] = useModal(() => (
    <AccountMenu onClose={hideAccountModal} />
  ));
  const [search, setSearch] = useState("");
  const isSearching = useSelector(state => state.isSearching);
  const classes = styleSheet();
  const dispatch = useDispatch();

  const buttonClassname = clsx({
    [classes.toolBarEnabled]: !isSearching,
    [classes.toolBarDisabled]: isSearching
  });

  return (
    <div style={styleSheet_outside.mainContainer}>
      <div style={styleSheet_outside.searchBar}>
        <div className={classes.search}>
          <IconButton
            className={classes.searchIcon}
            onClick={() => {
              handlePing().then(success => {
                if (success) {
                  dispatch(setSearching(true));
                  dispatch(clearAllElements());
                  getProfile(search).then((data: DataArray) => {
                    if (data) {
                      data.elements.map((obj: Element) => {
                        dispatch(addElement(obj));
                      });
                      dispatch(updateBackground(data.background));
                    } else {
                      dispatch(
                        setMessage(
                          search + " does not exist in the database",
                          false
                        )
                      );
                    }
                  });
                } else {
                  dispatch(toggleAccountMenu());
                  showAccountModal();
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
          className={classes.toolBarEnabled}
          onClick={() => {
            // maybe have a check here for if we're logged in (maybe "ping" the server, and have the server return "true" if logged in)
            // if we're logged in, then don't show the below, just go back home, could do that by passing some element which resets Main.tsx
            handlePing().then(success => {
              if (success) {
                //if we're logged in, also, one could perhaps send a websocket message instead, just ensure to have @auth.login_required ? we'll see
                dispatch(setSearching(false));
              } else {
                dispatch(toggleAccountMenu());
                showAccountModal();
              }
            });
          }}
        >
          <AccountBox style={styleSheet_outside.toolBarIcon} />
        </div>
        <div
          className={buttonClassname}
          onClick={() => {
            handlePing().then(success => {
              if (success) {
                if (!isSearching) dispatch(edit());
              } else {
                dispatch(toggleAccountMenu());
                showAccountModal();
              }
            });
          }}
        >
          <Create style={styleSheet_outside.toolBarIcon} />
          {isSearching ? (
            <div style={styleSheet_outside.toolBarIconPrevent}>
              <Close style={{ width: "100%", height: "100%" }}></Close>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={classes.toolBarEnabled}
          onClick={() =>
            handleLogout().then(() => {
              dispatch(clearAllElements());
              dispatch(updateBackground(""));
            })
          }
        >
          <Close style={styleSheet_outside.toolBarIcon} />
        </div>
      </div>
    </div>
  );
}

export default Top;
