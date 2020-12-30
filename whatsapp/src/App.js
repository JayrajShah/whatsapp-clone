import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const useStyles = makeStyles((theme) => ({
    app: {
      display: "grid",
      placeItems: "center",
      height: "100vh",
      backgroundColor: theme.palette.grey[200],
    },
    app__body: {
      display: "flex",
      marginTop: "-50px",
      height: "90vh",
      width: "90vw",
      boxShadow: "-1px 4px 20px -6px rgba(0,0,0,0.75)",
    },
  }));
  const classes = useStyles();
  return (
    <Grid className={classes.app}>
      <Paper className={classes.app__body} elevation={5}>
        <Sidebar />
        <Chat />
      </Paper>
    </Grid>
  );
}

export default App;
