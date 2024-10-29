import { Button, MenuItem, MenuList, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  let navigate = useNavigate();

  const deconnexion = () => {
    sessionStorage.clear();
    navigate("login");
  };
  return (
    <div>
      <div className="logo">
        <img src="../img/share.png" alt="logo" />
        <Typography fontSize="2vw" fontFamily="fantasy" color="white">
          Organized
        </Typography>
      </div>
      <div>
        <MenuList sx={{ color: "white", bgcolor: "#252525" }}>
          <Link to="/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{ background: window.location.pathname == "/" ? "gray" : "transparent" }}
            >
              <img
                src="../img/home.png"
                alt="add"
                width="23vw"
                style={{ marginRight: 10 }}
              />
              <Typography fontSize="1.3vw" textAlign="center" color="white">
                Acceuil
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to="projet/"
            style={{ color: "white", textDecorationLine: "none" }}
          >
            <MenuItem
              style={{ background: window.location.pathname == "/projet/" ? "gray" : "transparent" }}
            >
              <img
                src="../img/project.png"
                alt="proj"
                width="23vw"
                style={{ marginRight: 10 }}
              />
              <Typography fontSize="1.3vw">Vos projet</Typography>
            </MenuItem>
          </Link>

          <Link to="taches/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{ background: window.location.pathname == "/taches/" ? "gray" : "transparent" }}
            >
              <img
                src="../img/todo_list.png"
                width="23vw"
                style={{ marginRight: 10 }}
              />
              <Typography fontSize="1.3vw" textAlign="center" color="white">
                Reste à faire
              </Typography>
            </MenuItem>
          </Link>

          <Link to="info/" style={{ textDecorationLine: "none" }}>
            <MenuItem
              style={{ background: window.location.pathname == "/info/" ? "gray" : "transparent" }}
            >
              <img
                src="../img/user_info.png"
                width="23vw"
                style={{ marginRight: 10 }}
              />
              <Typography fontSize="1.3vw" textAlign="center" color="white">
                Vos Informations
              </Typography>
            </MenuItem>
          </Link>
        </MenuList>
      </div>
      <div className="logout">
        <Button sx={{ width: "100%" }} onClick={deconnexion}>
          <img
            src="../img/shutdown.png"
            alt="shutdown"
            width="40vw"
            style={{ marginRight: 10 }}
          />
          <Typography fontSize="1.3vw" color="white">
            Déconnexion
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
