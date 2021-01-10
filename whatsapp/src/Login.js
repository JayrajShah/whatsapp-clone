import React from "react";

import { Grid, Paper, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Chat, DonutLarge, MoreVert, Search } from "@material-ui/icons";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  login_container: {
    padding: 30,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Grid className={classes.login}>
      <Paper elevation={3} className={classes.login_container}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h3" style={{ padding: 20 }}>
            Login here
          </Typography>
          <Divider />
          <Button variant="contained" color="primary" onClick={signIn}>
            SignIn with Google
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
