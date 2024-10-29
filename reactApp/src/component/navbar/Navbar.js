import {
  AppBar,
  Avatar,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import "./navbar.css";

function Navbar({avatar, username}) {
  return (
    <div className="navbar">
      <AppBar sx={{ bgcolor: "transparent" }} elevation={0} position="relative" >
        <Toolbar style={{ justifyContent: "right" }}>
          <Avatar
            alt="rien"
            src={`http://127.0.0.1:8000${avatar}`}
            style={{ width: 24, height: 24, marginRight:"5px" }}
          />
          <Typography color="white">{username}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
