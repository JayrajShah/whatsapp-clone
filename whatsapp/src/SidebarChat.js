import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Divider,
  ButtonBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  sidebarChat: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
  sidebarChat__info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "20px",
  },
}));

const SidebarChat = () => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const classes = useStyles();
  return (
    <>
      <ButtonBase style={{ width: "100%" }} className={classes.sidebarChat}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <Grid className={classes.sidebarChat__info}>
          <h2 variant="h4">Room name</h2>
          <p variant="body1">This is the last message</p>
        </Grid>
      </ButtonBase>
      <Divider />
    </>
  );
};

export default SidebarChat;
