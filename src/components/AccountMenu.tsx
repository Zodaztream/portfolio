import React from "react";
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
// take hideAccountMOdal props

interface Iprops {
  onClose: () => void;
}

const useStyles = makeStyles({
  dialog: {
    display: "flex"
  },
  divider: {
    height: 60,
    margin: 4
  }
});

function AccountMenu(props: Iprops) {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Dialog
      className={classes.dialog}
      open={true}
      onClose={() => {
        dispatch(toggleAccountMenu());
        props.onClose();
      }}
      onExited={() => dispatch(toggleAccountMenu())} // what does onexited do? Does the nice transition back ?
    >
      <DialogContent>
        <form onSubmit={() => {}} id="login-form">
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField name="username" label="Username" required />
          </DialogContent>
          <DialogContent>
            <TextField
              type="password"
              name="password"
              label="Password"
              required
            />
          </DialogContent>
        </form>
      </DialogContent>
      <Divider
        className={classes.divider}
        variant="middle"
        orientation="vertical"
      />
      <DialogContent>
        <form onSubmit={() => {}} id="register-form">
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <TextField name="username" label="Username" required />
          </DialogContent>
        </form>
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
        <Button
          type="submit"
          form="login-form"
          color="primary"
          variant="contained"
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountMenu;
