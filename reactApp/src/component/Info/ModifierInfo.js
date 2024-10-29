import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {  useState } from "react";
import { useEffect } from "react";

function ModifierInfo({ user }) {
  var [open, setOpen] = useState(false);
  var [username, setUsername] = useState(user.username);
  var [email, setEmail] = useState(user.email);
  var [mot_de_passe, setMot_de_passe] = useState(user.mot_de_passe);
  var id=sessionStorage.getItem('id');
  const handleClickOpen = () => {
    setOpen(true);
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifierProfile = () => {
    var data=new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('mot_de_passe', mot_de_passe);
    console.log(data)
    axios.put(`http://127.0.0.1:8000/membres/update/${id}`,data).then((res)=>{
      console.log(res.data)
      handleClose()
    }).catch((err)=>{
      console.log(err)
    })
  };
  return (
    <>
      <Box width="fit-content" marginLeft="auto">
        <Button
          variant="contained"
          color="inherit"
          sx={{ paddingY: 0 }}
          onClick={handleClickOpen}
        >
          Modifier
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle sx={{ paddingY: 1 }}>Modifier information</DialogTitle>
        <DialogContent>
          <FormGroup>
            <InputLabel id="demo-simple-select-label">
              <Typography variant="h6">Username</Typography>
            </InputLabel>
            <TextField
              autoFocus
              variant="outlined"
              size="small"
              defaultValue={user.username}
              onBlur={(e) => setUsername(e.target.value.trim())}
              onChange={(e) => setUsername(e.target.value.trim())}
              
            />
            <InputLabel id="demo-simple-select-label">
              <Typography variant="h6">Email</Typography>
            </InputLabel>
            <TextField
              autoFocus
              variant="outlined"
              size="small"
              defaultValue={user.email}
              onBlur={(e) => setEmail(e.target.value.trim())}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <InputLabel id="demo-simple-select-label">
              <Typography variant="h6">Mot de passe</Typography>
            </InputLabel>
            <TextField
              autoFocus
              type="password"
              variant="outlined"
              size="small"
              defaultValue={user.mot_de_passe}
              onBlur={(e) => setMot_de_passe(e.target.value.trim())}
              onChange={(e) => setMot_de_passe(e.target.value.trim())}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "25px",
          }}
        >
          <Button variant="contained" color="error" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={modifierProfile}
            color="success"
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModifierInfo;
