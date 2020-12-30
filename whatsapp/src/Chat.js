import React from "react";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Paper,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticonOutlined,
  Send,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  chat: {
    display: "flex",
    flexDirection: "column",
    flex: "0.75",
  },
  chat__header: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  chat__headerInfo: {
    flex: 1,
    paddingLeft: 20,
  },
  chat__headerRight: {},
  chat__body: {
    flex: 1,
    backgroundColor: "#ECE5DD",
    backgroundPosition: "center",
    padding: 30,
    overflow: "scroll",
  },
  chat__message: {
    position: "relative",
    fontSize: 16,
    padding: 10,
    width: "fit-content",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 30,
  },
  chat__timestamp: {
    fontSize: "xx-small",
    marginLeft: 10,
  },
  chat__name: {
    fontSize: "xx-small",
    position: "absolute",
    top: -15,
    fontWeight: "800",
  },
  chat__reciever: {
    marginLeft: "auto",
    backgroundColor: "#dcf8c6",
  },
  chat__footer: {
    display: "flex",
    alignItems: "center",
  },
  sidebar__search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: "50px",
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  sidebar__searchContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
}));

const Chat = ({ messages }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.chat}>
      <Grid className={classes.chat__header}>
        <Avatar />
        <Grid className={classes.chat__headerInfo}>
          <h3>Room Name</h3>
          <p style={{ color: "grey" }}>Last seen at..</p>
        </Grid>
        <Grid className={classes.chat__headerRight}>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Grid className={classes.chat__body} id="chat__body">
        {messages.map((message) => {
          return (
            <p
              key={message._id}
              className={[
                classes.chat__message,
                message.received ? classes.chat__reciever : "",
              ].join(" ")}
            >
              <span className={classes.chat__name}>{message.name}</span>
              {message.message}
              <span className={classes.chat__timestamp}>
                {new Date().toUTCString()}
              </span>
            </p>
          );
        })}
      </Grid>
      <form action="">
        <Grid className={classes.chat__footer}>
          <Paper className={classes.sidebar__search} elevation={3}>
            <Grid className={classes.sidebar__searchContainer}>
              <IconButton>
                <InsertEmoticonOutlined />
              </IconButton>
              <input
                style={{ outlineWidth: "0", border: "none", width: "100%" }}
                type="text"
                placeholder="Search or start a new chat"
              />
            </Grid>
          </Paper>
          <Fab
            aria-label="add"
            style={{
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "#25D366",
            }}
          >
            <Send style={{ color: "#fff" }} />
          </Fab>
        </Grid>
      </form>
    </Grid>
  );
};

export default Chat;
