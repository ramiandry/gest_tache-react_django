import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function ListeGroupe() {
  var [data, setData] = useState([]);
  var id = sessionStorage.getItem("id");
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        await axios
          .get(`http://127.0.0.1:8000/membres/findAll/`, {
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
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <Box width="100%">
      <Paper sx={{ height: "26vh", padding: "1vh" }}>
        <div style={{ borderBottom: "0.5px solid gray" }}>
          <Typography variant="h6" fontWeight="bold">
            Vos membres du groupe
          </Typography>
        </div>
        <div>
          <List
            disablePadding
            style={{ display: "flex", flexDirection: "row" }}
          >
            {data.map((data)=>{
              return(
                <>
                {data.id!=id?
                <ListItem sx={{ flexDirection: "column" }}>
                <ListItemAvatar>
                  <Avatar
                    src={`http://127.0.0.1:8000${data.avatar}`}
                    style={{ width: "5vw", height: "10vh" }}
                  />
                </ListItemAvatar>
                <ListItemText>{data.username}</ListItemText>
              </ListItem>:null}
              </>
              )
            })}
          </List>
        </div>
      </Paper>
    </Box>
  );
}

export default ListeGroupe;
