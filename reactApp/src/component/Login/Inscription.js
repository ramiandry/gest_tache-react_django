import {
  Alert,
  Box,
  Button,
  Divider,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inscription() {
  var [username, setUsername] = useState(null);
  var [mot_de_passe, setMot_de_passe] = useState(null);
  var [email, setEmail] = useState(null);
  var [path, setPath] = useState("../img/user.png");
  var [avatar, setAvatar] = useState(null);
  var [alerte, setAlerte]=useState('')
  let navigate=useNavigate()
  const handleClick = async() => {
    var formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mot_de_passe", mot_de_passe);
    
    if(avatar!=null && username!="" && mot_de_passe!="" && email!=""){
      console.log(formData);
      try {
        await axios.post("http://127.0.0.1:8000/membres/add", formData).then((res)=>{
        console.log(res.data)
        setAlerte('')
        window.location.reload()
        })
      } catch (error) {
        console.log(error)
        setAlerte(<Alert severity="error">Verifier votre connexion {"(localhost:8000)"}</Alert>)
      }
    } else{
      setAlerte(<Alert severity="error">Veuillez remplir tout le champ!!</Alert>)
    }  
  };
  return (
    <div>
      <Box>
        {alerte}
        <FormGroup method="post" encType="multipart/form-data">
          <Divider>
            <img
              src="../img/signup.png"
              width="60px"
              style={{ marginTop: "10px" }}
            />
            <Typography variant="h5">Inscription</Typography>
          </Divider>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              src={path}
              width="100px"
              height="100px"
              style={{
                border: "3px solid gray",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            />
            <TextField
              type="file"
              variant="standard"
              accept="*/Image"
              onChange={(e) => {
                setPath(URL.createObjectURL(e.target.files[0]));
                setAvatar(e.target.files[0]);
              }}
              required={true}
            />
          </Box>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            label="Username"
            fullWidth
            sx={{ marginY: "10px" }}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <TextField
            type="email"
            variant="outlined"
            size="small"
            label="Email"
            fullWidth
            sx={{ marginY: "10px" }}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <TextField
            type="password"
            variant="outlined"
            label="Mot de passe"
            size="small"
            fullWidth
            sx={{ marginY: "10px" }}
            onChange={(e) => setMot_de_passe(e.target.value.trim())}
          />
          <Button
            type="submit"
            variant="contained"
            color="inherit"
            sx={{ marginX: "50px", width: "70%" }}
            onClick={handleClick}
          >
            S'INSCRIRE
          </Button>
        </FormGroup>
      </Box>
    </div>
  );
}

export default Inscription;
