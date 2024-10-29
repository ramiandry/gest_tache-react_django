import React from "react";
import "./acceuil.css";
import {useNavigate} from "react-router-dom"
import ListeGroupe from "./ListeGroupe";
import ListeTache from "./ListeTache";
import Projet from "./Projet";

function Acceuil() {

  return (
    <div className="cont-acceuil">
      <div className="acceuil-list">
        <ListeTache />
        <Projet />
      </div>
      <div className="acceuil-groupe">
        <ListeGroupe/>
      </div>
    </div>
  );
}

export default Acceuil;
