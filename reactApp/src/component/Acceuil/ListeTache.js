import React, { useEffect, useState } from "react";
import {
  Box,
  ListItemText,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  TextField,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

function ListeTache() {
  const [open, setOpen] = useState(false);
  var [data, setData] = useState([]);
  var id = sessionStorage.getItem("id");
  var [titre, setTitre] = useState("");
  var [deadline, setDeadline] = useState("");
  var [etat, setEtat] = useState(1);
  const source = axios.CancelToken.source();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/taches/findOneByPk/${id}`, {
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

  const createTache = () => {
    var formData = new FormData();
    formData.append("titre", titre);
    formData.append("deadline", deadline);
    formData.append("etat", etat);
    console.log(formData);
    axios
      .post(`http://127.0.0.1:8000/taches/add/${id}`, formData, {
        cancelToken: source.token,
      })
      .then((res) => {
        setData([...data, res.data]);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  };
  return (
    <Box width="40vw" margin="2vh">
      <Paper sx={{ height: "50vh", padding: "1vh" }}>
        <Typography variant="h4" fontWeight="bolder">
          Liste de vos tache
        </Typography>
        <List
          sx={{
            border: "0.5px solid gray",
            paddingTop: 0,
            height: "40vh",
            fontSize: "1.5vh",
          }}
        >
          <ListItem
            sx={{
              borderBottom: "0.5px solid gray",
              paddingY: 0,
              justifyContent: "space-between",
              fontSize: "1.5vh",
            }}
          >
            <ListItemText style={{ width: "65%", fontSize: "1.5vh !important" }}>
            <Typography sx={{fontSize: "1.5vh" }}>Titre</Typography>
            </ListItemText>
            <ListItemText sx={{ width: "20%", fontSize: "1.5vh" }}>
              <Typography sx={{fontSize: "1.5vh" }}>Deadline</Typography>
            </ListItemText>
            <ListItemText sx={{ width: "15%", fontSize: "1.5vh" }}>
            <Typography sx={{fontSize: "1.5vh" }}>Etat</Typography>
            </ListItemText>
          </ListItem>
          {data.map((data) => {
            return (
              <>
                <ListItem sx={{ paddingY: 0, justifyContent: "space-between" }}>
                  <ListItemText sx={{ width: "65%" }}>
                  <Typography sx={{fontSize: "1.5vh" }}>{data.titre}</Typography>
                  </ListItemText>
                  <ListItemText sx={{ width: "20%" }}>
                  <Typography sx={{fontSize: "1.5vh" }}>{data.deadline}</Typography>
                  </ListItemText>
                  <ListItemText sx={{ width: "15%" }}>
                  <Typography sx={{fontSize: "1.5vh" }}>{data.etat == 1
                      ? "En Cours"
                      : data.etat == 2
                      ? "Revue"
                      : "Terminé"}</Typography>
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
        {/*---------------------Modal d'isertion de taches---------------*/}
      </Paper>
      <FormGroup method="post" encType="multipart/form-data">
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Ajouter un tâches"}
          </DialogTitle>
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
              onClick={createTache}
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
  );
}

export default ListeTache;
