import {
  Box,
  Typography,
  Paper,
  Button,
  InputLabel,
  TextField,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
  ListItem,
  ListItemText,
  ListItemButton,
  List,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Projet() {
  var id = sessionStorage.getItem("id");
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [debut, setDebut] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [etat, setEtat] = useState(1);
  var [data, setData] = useState([]);
  const source = axios.CancelToken.source();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProjet = () => {
    var formData = new FormData();
    formData.append("nom_projet", nom);
    formData.append("debut", debut);
    formData.append("deadline", deadline);
    formData.append("etat_projet", etat);
    axios
      .post(`http://127.0.0.1:8000/projets/add/${id}`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/projets/findOneByPk/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setData(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Box width="40vw" margin="2vh">
        <Paper sx={{ height: "50vh", padding: "1vh" }}>
          <div style={{ borderBottom: "0.5px solid gray" }}>
            <Typography variant="h4" fontWeight="bolder">
              Liste de vos projet
            </Typography>
          </div>
          {data.length==0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                height: "45vh",
              }}
            >
              <Button
                sx={{ flexDirection: "column", display: "flex" }}
                onClick={handleClickOpen}
              >
                <img src="img/add.png" width="70vw" />
                <Typography color="black" fontWeight="bolder">
                  Nouveau projet
                </Typography>
              </Button>
            </div>
          ) : (
            <>
              <List
                sx={{
                  border: "0.5px solid gray",
                  paddingTop: 0,
                  height: "43vh",
                }}
              >
                <ListItem
                  sx={{
                    borderBottom: "0.5px solid gray",
                    paddingY: 0,
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText sx={{ width: "65%" }}>Titre</ListItemText>
                  <ListItemText sx={{ width: "20%" }}>Deadline</ListItemText>
                  <ListItemText sx={{ width: "15%" }}>Etat</ListItemText>
                </ListItem>
                {data.map((data) => {
                  return (
                    <>
                      <ListItem
                        sx={{ paddingY: 0, justifyContent: "space-between" }} style={{fontSize:"1.2vw !important"}}
                      >
                        <ListItemText sx={{ width: "65%" }}>
                          {data.nom_projet}
                        </ListItemText>
                        <ListItemText sx={{ width: "20%" }}>
                          {data.deadline}
                        </ListItemText>
                        <ListItemText sx={{ width: "15%" }}>
                          {data.etat == 1
                            ? "En Cours"
                            : data.etat==2
                            ? "Revue"
                            : "Terminé"}
                        </ListItemText>
                      </ListItem>
                    </>
                  );
                })}
                <ListItemButton
                  sx={{ paddingY: 0, justifyContent: "center" }}
                  onClick={handleClickOpen}
                >
                  <img src="img/add.png" width="30vw" />
                  <Typography color="black" fontWeight="bolder" marginX="10px">
                    Nouveau projet
                  </Typography>
                </ListItemButton>
              </List>
            </>
          )}
        </Paper>
        <FormGroup method="post" encType="multipart/form-data">
          <Dialog
            open={open}
            fullWidth
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Ajouter un projets"}
            </DialogTitle>
            <DialogContent>
              <InputLabel id="demo-simple-select-label">Nom</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                placeholder="Nom du projet"
                fullWidth
                variant="outlined"
                onChange={(e) => setNom(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Début</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                id="debut"
                type="date"
                fullWidth
                variant="outlined"
                onChange={(e) => setDebut(e.target.value)}
              />
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
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={createProjet}
              >
                Ajouter
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Annuler
              </Button>
            </DialogActions>
          </Dialog>
        </FormGroup>
      </Box>
    </>
  );
}

export default Projet;
