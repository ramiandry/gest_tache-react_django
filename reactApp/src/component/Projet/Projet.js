import { Box, Button, Input, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Carte from "./Carte";
import "./projet.css";

function Projet() {
  var [data, setData] = useState([]);
  var [deadline,setDeadline]=useState(0);
  var date=new Date();
  var id = sessionStorage.getItem("id");
  useEffect(() => {
    const source = axios.CancelToken.source();
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
  console.log("data" + data);
  return (
    <div className="cont-projet">
      <Box>
        <Box display="flex" justifyContent="space-between" width="97%">
          <Typography variant="h5" color="white">
            Deadline :{" "}
          </Typography>
          <Button sx={{color:deadline!=1?"white":null}} variant={deadline==1?"outlined":"standard"} onClick={(e)=>deadline==1?setDeadline(0):setDeadline(1)}>Cette année</Button>
          <Button sx={{color:deadline!=2?"white":null}} variant={deadline==2?"outlined":"standard"} onClick={(e)=>deadline==2?setDeadline(0):setDeadline(2)}>Cette mois</Button>
          <Button sx={{color:deadline!=3?"white":null}} variant={deadline==3?"outlined":"standard"} onClick={(e)=>deadline==3?setDeadline(0):setDeadline(3)}>Ce Jour</Button>
        </Box>
      </Box>
      <div className="list-projet">
        {data.map((data) => {
          return (
            <>{deadline==0?
              <Carte
                id={data.admins}
                id_projets={data.id}
                nom_projet={data.nom_projet}
                debut={data.debut}
                deadline={data.deadline}
                etat={data.etat_projet}
                color={
                  data.etat_projet == 1
                    ? "#edae44"
                    : data.etat_projet == 2
                    ? "#8715c6"
                    : "green"
                }
              />:deadline==1?(date.getFullYear()==new Date(data.deadline).getFullYear()?<Carte
              id={data.admins}
              id_projets={data.id}
              nom_projet={data.nom_projet}
              debut={data.debut}
              deadline={data.deadline}
              etat={data.etat_projet}
              color={
                data.etat_projet == 1
                  ? "#edae44"
                  : data.etat_projet == 2
                  ? "#8715c6"
                  : "green"
              }
            />:null):deadline==2?(date.getMonth()==new Date(data.deadline).getMonth()?<Carte
            id={data.admins}
            id_projets={data.id}
            nom_projet={data.nom_projet}
            debut={data.debut}
            deadline={data.deadline}
            etat={data.etat_projet}
            color={
              data.etat_projet == 1
                ? "#edae44"
                : data.etat_projet == 2
                ? "#8715c6"
                : "green"
            }
          />:null):deadline==3?(date.getDay()==new Date(data.deadline).getDay()?<Carte
          id={data.admins}
          id_projets={data.id}
          nom_projet={data.nom_projet}
          debut={data.debut}
          deadline={data.deadline}
          etat={data.etat_projet}
          color={
            data.etat_projet == 1
              ? "#edae44"
              : data.etat_projet == 2
              ? "#8715c6"
              : "green"
          }
        />:null):null}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Projet;
