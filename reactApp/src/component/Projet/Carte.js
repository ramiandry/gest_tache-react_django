import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Select,
  TableCell,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AttribuerTache from "./AttribuerTache";

function Carte({ id_projets, nom_projet, deadline, debut, etat, color, id }) {
  var [open, setOpen] = useState(false);
  var [data, setData] = useState([]);
  var [user, setUser] = useState([]);
  var [etat_projet, setEtat]=useState(etat)
  var [dataTaches, setDataTaches] = useState([]);
  const source = axios.CancelToken.source();
  const handleClickOpen = () => {
    setOpen(true);
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/membres/findOneByPk/${id}`, {
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

      try {
        await axios
          .get(`http://127.0.0.1:8000/taches/findByProject/${id_projets}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataTaches(res.data);
            console.log(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }

      try {
        await axios
          .get(`http://127.0.0.1:8000/membres/findAll/`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setUser(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };

    fetchData();
  }, []);

  const modifierEtat=()=>{
    axios.put(`http://127.0.0.1:8000/projets/update/${id_projets}`,{"etat":etat_projet}).then((res)=>{
      handleClose()
      window.location.reload()
    })
  }
  return (
    <div>
      <Card
        sx={{
          width: "300px",
          border: "1px solid " + color,
          marginX: "1vw",
          marginY:"2vh",
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
      >
        <CardHeader title={nom_projet} sx={{ bgcolor: color, fontSize:"12pt" }} />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <AvatarGroup max={dataTaches.length}>
            <Avatar alt={data.username} src={`http://127.0.0.1:8000${data.avatar}`} />
          </AvatarGroup>
          <Typography variant="h5">Admin</Typography>
        </CardContent>
        <CardContent
          sx={{
            paddingY: "0 !important",
            border: "1px solid " + color,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">
            Etat : {etat == 1 ? "En Cours" : etat == 2 ? "Revue" : "Terminé"}
          </Typography>
          <Typography>{deadline}</Typography>
        </CardContent>
      </Card>
      {/*-------------------modal-------------*/}
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {<DialogTitle id="responsive-dialog-title">{nom_projet}</DialogTitle>}
        <DialogContent>
          <Divider>Informations</Divider>
          <Box display="flex" justifyContent="left" alignItems="end">
            <Typography>Chef de projet : </Typography>
            <Avatar src={`http://127.0.0.1:8000${data.avatar}`} />{" "}
            <Typography>{data.username}</Typography>
          </Box>
          <Box display="flex" justifyContent="left" alignItems="end">
            <Typography>Nombres des taches: </Typography>
            <Typography>{dataTaches.length} taches</Typography>
          </Box>
          <Box display="flex" justifyContent="left" alignItems="end">
            <Typography>Etat: </Typography>
            <form>
              <select onChange={e=>setEtat(e.target.value)}>
                <option value="1" defaultChecked={etat == 1 ? "checked" : null}>En cours</option>
                <option value="2" defaultChecked={etat == 2 ? "checked" : null}>Révue</option>
                <option value="3" defaultChecked={etat == 3 ? "checked" : null}>Terminé</option>
              </select>
            </form>
          </Box>
          <Divider>
            <Typography>Listes des taches et membres</Typography>
          </Divider>
          <AttribuerTache id_projets={id_projets} data={user}/>
          <table style={{ width: "100%" }}>
            <thead>
              <th>User</th>
              <th>Taches</th>
              <th>Etat</th>
            </thead>
            <tbody>
              {dataTaches.map((data) => {
                return (
                  <>
                    {user.map((user) => {
                      return (
                        <>
                          {data.membres==user.id?<tr>
                            <td>
                              <Typography sx={{ display: "flex" }}>
                                <Avatar
                                  alt="rien"
                                  src={`http://127.0.0.1:8000${user.avatar}`}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: "5px",
                                  }}
                                />
                                {user.username}
                              </Typography>
                            </td>
                            <td>{data.titre}</td>
                            <td>
                              {data.etat == 1
                                ? "En Cours"
                                : data.etat == 2
                                ? "Revue"
                                : "Terminé"}
                            </td>
                          </tr>:null}
                        </>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </DialogContent>
        {/*<List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={"../img/add.png"} />
              </ListItemAvatar>
              <ListItemText
                primary={"raf fana"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {"xezz@kjjjk.bj"}
                    </Typography>
                    <br />
                    {"Date de naissance: " + new Date().toLocaleDateString()}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        </List>    */}
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Button variant="contained" color="error" onClick={handleClose}>
            Fermer
          </Button>
          {etat!=etat_projet?<Button type="submit" variant="contained" color="success" onClick={modifierEtat}>
            Modifier
          </Button>:null}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Carte;
