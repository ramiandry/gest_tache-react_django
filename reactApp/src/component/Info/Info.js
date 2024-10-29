import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ModifierInfo from "./ModifierInfo";

function Info() {
  var [data, setData] = useState({});
  var [dataTaches, setDataTaches] = useState([]);
  var [dataProjets, setDataProjets] = useState([]);
  var id = sessionStorage.getItem("id");
  useEffect(() => {
    const source = axios.CancelToken.source();
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
          .get(`http://127.0.0.1:8000/projets/findOneByPk/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataProjets(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }

      try {
        await axios
          .get(`http://127.0.0.1:8000/taches/findOneByPk/${id}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setDataTaches(res.data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is cancel");
        }
      }
    };
    fetchData();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div>
      <Divider variant="fullWidth" sx={{ borderColor: "white" }}>
        <Typography variant="h5" color={"white"}>
          Profile
        </Typography>
      </Divider>

      <Box>
        <Paper
          sx={{
            width: "50vw",
            marginX: "auto",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            margin="2vw"
            border="2px solid gray"
            width="fit-content"
            padding="5px"
          >
            <Avatar
              src={`http://127.0.0.1:8000${data.avatar}`}
              sx={{ width: "10vw", height: "20vh" }}
            />
          </Box>

          <Box width="70%">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginY="1vh"
              width="100%"
            >
              <Typography
                sx={{
                  padding: 0,
                  marginY: 0,
                  lineHeight: 0,
                  marginRight: "10px",
                }}
              >
                <img src="../img/username.png" style={{ width: "50px" }} />
              </Typography>
              <TextField
                size="small"
                sx={{ margin: 0 }}
                fullWidth
                type="text"
                value={data.username}
                disabled
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{
                  padding: 0,
                  marginY: 0,
                  lineHeight: 0,
                  marginRight: "10px",
                }}
              >
                <img src="../img/mail.png" style={{ width: "50px" }} />
              </Typography>
              <TextField
                size="small"
                sx={{ margin: 0 }}
                fullWidth
                type="text"
                value={data.email}
                disabled
              />
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{
                  padding: 0,
                  marginY: 0,
                  lineHeight: 0,
                  marginRight: "10px",
                }}
              >
                <img src="../img/password.png" style={{ width: "50px" }} />
              </Typography>
              <TextField
                sx={{ margin: 0, lineHeight: 0, padding: 0 }}
                fullWidth
                size="small"
                type="password"
                value={data.mot_de_passe}
                disabled
              />
            </Box>
            <ModifierInfo user={data} />
          </Box>
        </Paper>
      </Box>
      <Divider variant="fullWidth" sx={{ borderColor: "white" }}>
        <Typography variant="h5" color={"white"}>
          Tâches et projets
        </Typography>
      </Divider>
      <Box>
        <Paper sx={{ width: "50vw", marginX: "auto", paddingX: "10px" }}>
          <Box>
            <Divider>
              <Typography variant="h6">Nombres de vos tâches</Typography>
            </Divider>
            <table style={{ width: "50%" }}>
              <tr>
                <th
                  style={{
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "40px",
                  }}
                >
                  En cours
                </th>
                <td>
                  : {dataTaches.filter((data) => data.etat == 1).length} taches
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "40px",
                  }}
                >
                  Révue
                </th>
                <td>
                  : {dataTaches.filter((data) => data.etat == 2).length} taches
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "40px",
                  }}
                >
                  Terminé
                </th>
                <td>
                  : {dataTaches.filter((data) => data.etat == 3).length} taches
                </td>
              </tr>
            </table>
          </Box>
          <Box>
            <Divider>
              <Typography variant="h6">Nombres de vos projets</Typography>
            </Divider>
            <table style={{ width: "50%" }}>
              <tr>
                <th
                  style={{
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "40px",
                  }}
                >
                  En cours
                </th>
                <td>
                  : {dataProjets.filter((data) => data.etat_projet == 1).length}{" "}
                  projets
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "40px",
                  }}
                >
                  Révue
                </th>
                <td>
                  : {dataProjets.filter((data) => data.etat_projet == 2).length}{" "}
                  projets
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "40px",
                  }}
                >
                  Terminé
                </th>
                <td>
                  : {dataProjets.filter((data) => data.etat_projet == 3).length}{" "}
                  projets
                </td>
              </tr>
            </table>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Info;
