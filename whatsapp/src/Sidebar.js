import React from "react";
import SidebarChat from "./SidebarChat";

import {
  Grid,
  IconButton,
  Avatar,
  TextField,
  Paper,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Chat, DonutLarge, MoreVert, Search } from "@material-ui/icons";
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    flex: "0.25",
  },
  sidebar__header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    // borderRight: "1px solid lightgrey",
    alignItems: "center",
  },
  sidebar__headerRight: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "10vw",
  },
  sidebar__search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: "50px",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    marginTop: 10,
    padding: 3,
  },
  sidebar__searchContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();
  return (
    <Grid className={classes.sidebar}>
      <Grid className={classes.sidebar__header}>
        <Avatar src={user.photoURL} />
        <Grid className={classes.sidebar__headerRight}>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Paper className={classes.sidebar__search} elevation={3}>
        <Grid className={classes.sidebar__searchContainer}>
          <Search style={{ color: "grey", padding: 3 }} />
          <input
            style={{ outlineWidth: "0", border: "none", width: "100%" }}
            type="text"
            placeholder="Search or start a new chat"
          />
        </Grid>
      </Paper>
      <Grid className="sidebar__chats">
        <SidebarChat />
      </Grid>
    </Grid>
  );
};

export default Sidebar;
