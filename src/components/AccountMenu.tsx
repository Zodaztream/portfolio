import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {
  toggleAccountMenu,
  updateBackground,
  addElement,
  setMessage
} from "../actions";
import { makeStyles } from "@material-ui/core";
import background from "../images/background.jpg";
import { url } from "inspector";
import { handleLogin, handleRegister, getProfile } from "./Network";
import { green, red } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import { DataArray, Element, ResponseType } from "./types";

// take hideAccountMOdal props

interface Iprops {
  onClose: () => void;
}

const useStyles = makeStyles({
  dialog: {
    display: "flex"
  },
  divider: {
    height: 250,
    margin: 4
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonUnSuccess: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  buttonDefault: {},

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

function AccountMenu(props: Iprops) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const timer = React.useRef<number>();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonDefault]: !hasLoaded,
    [classes.buttonUnSuccess]: !success && hasLoaded
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Dialog
      open={true}
      onClose={() => {
        dispatch(toggleAccountMenu());
        props.onClose();
      }}
      onExited={() => dispatch(toggleAccountMenu())} // what does onexited do? Does the nice transition back ?
    >
      <DialogContent className={classes.dialog}>
        <div>
          <form
            onSubmit={event => {
              event.preventDefault();
            }}
            id="login-form"
          >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <TextField
                name="username"
                label="Username"
                required
                onChange={event => setUsername(event.currentTarget.value)}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                type="password"
                name="password"
                label="Password"
                onChange={event => setPassword(event.currentTarget.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                form="login-form"
                color="primary"
                variant="contained"
                className={buttonClassname}
                disabled={loading}
                onClick={() => {
                  if (!loading) {
                    setSuccess(false);
                    setLoading(true);
                    setHasLoaded(true);

                    if (username && password) {
                      handleLogin(username, password).then(promiseSuccess => {
                        setSuccess(promiseSuccess);
                        setLoading(false);
                        if (promiseSuccess) {
                          getProfile("").then(
                            (response: ResponseType | void) => {
                              if (response) {
                                if (response.data && response.success) {
                                  const {
                                    elements,
                                    background
                                  }: DataArray = JSON.parse(response.data);
                                  elements.map((obj: Element) => {
                                    dispatch(addElement(obj));
                                  });
                                  dispatch(updateBackground(background));
                                } else {
                                  dispatch(setMessage(response.message, true));
                                }
                              }
                            }
                          );
                          timer.current = window.setTimeout(() => {
                            dispatch(toggleAccountMenu());
                            props.onClose();
                          }, 1000);
                        }
                      }); //set error message or somethin
                    }
                  }
                }}
              >
                Login
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </DialogActions>
          </form>
        </div>
        <Divider
          className={classes.divider}
          variant="middle"
          orientation="vertical"
        />
        <div>
          <form
            onSubmit={event => {
              event.preventDefault();
            }}
            id="register-form"
          >
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
              <TextField
                name="username"
                label="Username"
                required
                onChange={event => setUsername(event.target.value)}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                type="password"
                name="password"
                label="Password"
                required
                onChange={event => setPassword(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                form="login-form"
                color="primary"
                variant="contained"
                className={buttonClassname}
                disabled={loading}
                onClick={() => {
                  if (!loading) {
                    setSuccess(false);
                    setLoading(true);
                    setHasLoaded(true);

                    if (username && password) {
                      handleRegister(username, password).then(
                        promiseSuccess => {
                          setSuccess(promiseSuccess);
                          setLoading(false);
                        }
                      ); //set error message or somethin
                    }
                  }
                }}
              >
                Register
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountMenu;
