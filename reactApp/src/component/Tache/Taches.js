import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carte from "./Carte";

function Taches() {
  var [data, setData] = useState([]);
  var [filter, setFilter] = useState(0);
  var id = sessionStorage.getItem("id");
  const source = axios.CancelToken.source();
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
  return (
    <Box sx={{ paddingX: "2vw" }}>
      <Box display="flex" justifyContent="space-between" marginY="20px">
        <Typography
          variant="h5"
          color="white"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <img src="../img/filter.png" width="28vw" />
          Filtrer:
        </Typography>
        <Button  variant={filter==1?"outlined":null} onClick={e=>setFilter(1)}>
          <img
            src="../img/progress.png"
            width="25vw"
            style={{ background: "#edae44", borderRadius: "5px" }}
          />
          <Typography
            variant="h6"
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "4px",
              textTransform: "capitalize",
            }}
          >
            En Cours
          </Typography>
        </Button>
        <Button variant={filter==2?"outlined":null} onClick={e=>setFilter(2)}>
          <img
            src="../img/review.png"
            width="25vw"
            style={{ background: "#8715c6", borderRadius: "5px" }}
          />
          <Typography
            variant="h6"
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "4px",
              textTransform: "capitalize",
            }}
          >
            Revue
          </Typography>
        </Button>
        <Button  variant={filter==3?"outlined":null} onClick={e=>setFilter(3)} sx={{ marginRight: "6vw" }}>
          <img
            src="../img/done.png"
            width="25vw"
            style={{ background: "green", borderRadius: "5px" }}
          />
          <Typography
            variant="h6"
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "4px",
              textTransform: "capitalize",
            }}
          >
            Terminé
          </Typography>
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {data.map((data) => {
          return (
            <>
              {filter == 0 ? (
                <Carte
                  id={data.id}
                  titre={data.titre}
                  deadline={data.deadline}
                  projet={data.projet == null ? "Personnel" : data.projet}
                  etat={data.etat}
                  color={
                    data.etat == 1
                      ? "#edae44"
                      : data.etat == 2
                      ? "#8715c6"
                      : "green"
                  }
                />
              ) : filter == data.etat ? (
                <Carte
                  id={data.id}
                  titre={data.titre}
                  deadline={data.deadline}
                  projet={data.projet == null ? "Personnel" : data.projet}
                  etat={data.etat}
                  color={
                    data.etat == 1
                      ? "#edae44"
                      : data.etat == 2
                      ? "#8715c6"
                      : "green"
                  }
                />
              ) : null}
            </>
          );
        })}
      </Box>
    </Box>
  );
}

export default Taches;
