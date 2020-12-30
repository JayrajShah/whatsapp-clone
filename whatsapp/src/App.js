import { useEffect, useState } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pusher from "pusher-js";
import axios from "./axios";
import { animateScroll as scroll } from "react-scroll";

function App() {
  const [messages, setMessages] = useState([]);

  const scrollT0Bottom = () => {
    const poops = setInterval(() => {
      const chat__body = document.getElementById("chat__body");
      if (chat__body) {
        scroll.scrollToBottom({
          containerId: "chat__body",
        });
        // chat__body.scrollIntoView({ behaviour: "smooth" });
        chat__body.scrollTop = chat__body.scrollHeight;
        clearInterval(poops);
      }
    }, 100);
  };
  scrollT0Bottom();

  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("8842032136cb0213f716", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    setTimeout(() => {
      window.scrollBy(0, 500);
    }, 1000);
    scrollT0Bottom();
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

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
  console.log(messages);

  return (
    <Grid className={classes.app}>
      <Paper className={classes.app__body} elevation={5}>
        <Sidebar />
        <Chat messages={messages} />
      </Paper>
    </Grid>
  );
}

export default App;
