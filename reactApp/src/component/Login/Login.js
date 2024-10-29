import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Connexion from "./Connexion";
import Inscription from "./Inscription";
import "./login.css";

function Login() {
  var [index, setIndex] = useState(true);

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          elevation={3}
          sx={{
            width: "600px",
            height: "500px",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "5px",
          }}
        >
          <Box width="45%" bgcolor="#252525" borderRadius="5px 0 0 5px">
            <Box
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <div className="logo">
                <img src="../img/share.png" alt="logo" />
                <Typography fontSize="2vw" fontFamily="fantasy" color="white">
                  Organized
                </Typography>
              </div>
              <Button
                sx={{
                  padding: 0,
                  marginTop: "30px",
                  width: "80%",
                  height: "43%",
                  borderRadius: "50%",
                  marginX: "auto",
                }}
                onClick={(e) => setIndex(!index)}
              >
                <Box
                  width="100%"
                  height="100%"
                  margin="0"
                  bgcolor="whitesmoke"
                  borderRadius="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={index ? "../img/signup.png" : "../img/signin.png"}
                    alt="Signup"
                  />
                </Box>
              </Button>
              <Typography variant="h4" textAlign="center" color="whitesmoke">
                {index ? "S'inscrire" : "Se connecter"}
              </Typography>
            </Box>
          </Box>
          <Box
            width="51%"
            marginRight="2%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
          >
            {index?<Connexion/>:<Inscription />}
          </Box>
        </Paper>
      </Box>
    </>
  );
}
export default Login;