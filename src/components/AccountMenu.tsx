import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { toggleAccountMenu } from "../actions";
import { makeStyles } from "@material-ui/core";
import background from "../images/background.jpg";
import { url } from "inspector";
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
  }
});

function AccountMenu(props: Iprops) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
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
              >
                Login
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
                form="register-form"
                color="primary"
                variant="contained"
              >
                Register
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountMenu;
