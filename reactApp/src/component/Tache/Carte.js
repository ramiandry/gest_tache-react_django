import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Carte({color, etat, debut, deadline, projet, titre, id}) {
  var [etat_taches, setEtat] = useState(etat);
  var [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifierEtat=()=>{
    axios.put(`http://127.0.0.1:8000/taches/update/${id}`,{"etat":etat_taches}).then((res, e)=>{
      handleClose()
      window.location.reload()
      e.preventDefault()
    })
  }
  return (
    <Box width="250px" marginX="10px" marginY="5px">
      <Paper sx={{ borderLeft: "6px solid " + color, paddingX: "10px" }}>
        <Typography variant="h5" sx={{ height: "50px", lineHeight:1 }}>
          {titre}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            bgcolor: "GrayText",
            paddingX: "5px",
            borderRadius: "5px",
            width: "fit-content",
            fontWeight: "bolder",
          }}
        >
          {projet}
        </Typography>
        <Typography sx={{marginTop:"10px"}}>Deadline: {deadline}</Typography>
        <Button style={{marginLeft:"50%", color:"black"}} onClick={handleClickOpen}><img src="../img/edit.png"/> Modifier</Button>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <form method="post">
            <input type="radio" value="1" name="etat" defaultChecked={etat==1?"checked":null} onChange={e=>setEtat(e.target.value)}/> En cours <br />
            <input type="radio" value="2" name="etat" defaultChecked={etat==2?"checked":null} onChange={e=>setEtat(e.target.value)}/> Revue <br />
            <input type="radio" value="3" name="etat" defaultChecked={etat==3?"checked":null} onChange={e=>setEtat(e.target.value)}/> Terminé <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={modifierEtat} color="success">
            Modifier
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Carte;
