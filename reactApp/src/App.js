import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Navbar from './component/navbar/Navbar';
import Acceuil from './component/Acceuil/Acceuil';
import Dashbord from './component/Dashboard/Dashbord';
import Projet from './component/Projet/Projet';
import Taches from './component/Tache/Taches';
import Login from './component/Login/Login';
import Info from './component/Info/Info';

function App() {

  return (
   <Router>
      <Routes>
      <Route path='login/' element={<Login/>}/>
      <Route path="/" element={<Dashbord/>}>
        <Route path="/" element={<Acceuil/>}/>
        <Route path="projet/" element={<Projet/>}/>
        <Route path="info/" element={<Info/>}/>
        <Route path="taches/" element={<Taches/>}/>
      </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
