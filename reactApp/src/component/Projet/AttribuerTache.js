import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AttribuerTache({ id_projets, data }) {
  var [open, setOpen] = useState(false);
  var [id, setId] = useState(null);
  var [titre, setTitre] = useState("");
  var [deadline, setDeadline] = useState("");
  var [etat, setEtat] = useState(1);
  const source = axios.CancelToken.source();
  const handleClickOpen = () => {
    setOpen(true);
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTache = () => {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("titre", titre);
    formData.append("deadline", deadline);
    formData.append("etat", etat);
    console.log(formData);
    axios
      .post(`http://127.0.0.1:8000/taches/addGroupe/${id_projets}`, formData, {
        cancelToken: source.token,
      })
      .then((res) => {
        handleClose();
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color="inherit"
        sx={{ width: "fit-content", paddingX: 0.5, paddingY:0 }}
      >
        <img src="../img/add.png" width="30px" />
        Nouveau
      </Button>
      <FormGroup method="post" encType="multipart/form-data">
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Nouveau tâche</DialogTitle>
          <DialogContent>
            <InputLabel id="demo-simple-select-label">Titre</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              placeholder="Titre"
              fullWidth
              variant="outlined"
              onChange={(e) => setTitre(e.target.value.trim())}
            />
            <>
              <InputLabel id="demo-simple-select-label">Personnel</InputLabel>
              <Select
                fullWidth
                margin="dense"
                required
                onChange={(e) => setId(e.target.value)}
              >
                {data.map((data) => {
                  return (
                    <MenuItem value={data.id}>
                      <Typography sx={{ display: "flex" }}>
                        <Avatar
                          alt="rien"
                          src={`http://127.0.0.1:8000${data.avatar}`}
                          style={{ width: 24, height: 24, marginRight: "5px" }}
                        />
                        {data.username}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </>
            <InputLabel id="demo-simple-select-label">Deadline</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="deadline"
              type="date"
              fullWidth
              variant="outlined"
              onChange={(e) => setDeadline(e.target.value)}
            />
            <>
              <InputLabel id="demo-simple-select-label">ETAT</InputLabel>
              <Select
                fullWidth
                margin="dense"
                onChange={(e) => setEtat(e.target.value)}
              >
                <MenuItem value="1">En Cours</MenuItem>
                <MenuItem value="2">Revue</MenuItem>
                <MenuItem value="3">Terminé</MenuItem>
              </Select>
            </>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              onClick={createTache}
              variant="contained"
              color="success"
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </FormGroup>
    </>
  );
}

export default AttribuerTache;
