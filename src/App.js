import logo from './logo.svg';

import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import Game_SP from './components/Gamepage_S/Gamepage';
import Challenge from './components/Game_Global/challengePage';
import SignUp from './components/Signup/Signup';
import Login from './components/Signup/Login';
import { Link } from 'react-router-dom';
import Verification from './components/Signup/VerificationPage';
import Game_GP from './components/Game_Global/globalGame';

// import axios from 'axios';
// axios.defaults.withCredentials = true
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const App = () => {
  let querry = window.location.search.split("?").slice(1,2).join();
  
  return (
    <>
    <Router>
      <Routes>
      {querry ? <Navigate to = {process.env.PUBLIC_URL + querry} /> : <></>}

        <Route exact path={process.env.PUBLIC_URL + "/"} element={<HomePage />} />
        <Route exact path={process.env.PUBLIC_URL + "/Home"} element={<HomePage />} />
        <Route exact path={process.env.PUBLIC_URL + "/Profile"} element={<ProfilePage />} />
        <Route exact path={process.env.PUBLIC_URL + "/Singleplayer"} element={<Game_SP />} />
        <Route exact path={process.env.PUBLIC_URL + "/Verification"} element={<Verification />} />
        <Route exact path={process.env.PUBLIC_URL + "/Challenge"} element={<Challenge />} />
        <Route exact path={process.env.PUBLIC_URL + "/GlobalGame"} element={<Game_GP />} />
        
        {/* <Route exact path={process.env.PUBLIC_URL + "/Login"} element={<Verification />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
