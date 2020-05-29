/**
 * AccountMenu component
 * Displays the Account menu (login, register)
 */
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
import { handleLogin, handleRegister, getProfile } from "./Network";
import { green, red } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import { DataArray, Element, ResponseType } from "./types";

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

/**
 * @description This function component handles the accountmenu modal
 */
function AccountMenu(props: Iprops) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadedRegister, setHasLoadedRegister] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const timer = React.useRef<number>();

  // This allows the buttons' classes to change dynamically
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonDefault]: !hasLoaded,
    [classes.buttonUnSuccess]: !success && hasLoaded
  });

  const buttonClassnameRegister = clsx({
    [classes.buttonSuccess]: successRegister,
    [classes.buttonDefault]: !hasLoadedRegister,
    [classes.buttonUnSuccess]: !successRegister && hasLoadedRegister
  });

  const onClickLoginHandle = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setHasLoaded(true);
      if (username && password) {
        handleLogin(username, password).then(promiseSuccess => {
          setSuccess(promiseSuccess);
          setLoading(false);
          if (promiseSuccess) {
            // on login success fetch the profile
            getProfile("").then((response: ResponseType | void) => {
              if (response) {
                if (response.data && response.success) {
                  const { elements, background }: DataArray = JSON.parse(
                    response.data
                  );
                  elements.map((obj: Element) => {
                    dispatch(addElement(obj));
                  });
                  dispatch(updateBackground(background));
                } else if (!response.success) {
                  dispatch(setMessage(response.message, true));
                }
              }
            });
            timer.current = window.setTimeout(() => {
              dispatch(toggleAccountMenu());
              props.onClose();
            }, 1000);
          }
        });
      }
    }
  };

  const onClickRegisterHandle = () => {
    if (!loadingRegister) {
      setSuccessRegister(false);
      setLoadingRegister(true);
      setHasLoadedRegister(true);

      if (username && password) {
        handleRegister(username, password).then(promiseSuccess => {
          setSuccessRegister(promiseSuccess);
          setLoadingRegister(false);
        });
      }
    }
  };

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
      onExited={() => dispatch(toggleAccountMenu())}
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
                onClick={() => onClickLoginHandle()}
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
                className={buttonClassnameRegister}
                disabled={loadingRegister}
                onClick={() => onClickRegisterHandle()}
              >
                Register
                {loadingRegister && (
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
