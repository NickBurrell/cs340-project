import './App.css';
import './TableUtils.css'

import React, {useState} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";

import HomePage from "./pages/HomePage";
import AdventurerPage from "./pages/AdventurersPage";
import ExpeditionsPage from "./pages/ExpeditionsPage";
import ExpeditionRostersPage from "./pages/ExpeditionRosterPage";
import AcquisitionsPage from "./pages/AcquisitionsPage";
import DisbursementsPage from "./pages/DisbursementsPage";

function App() {
    return (
        <>
            <Router>
                <Navigation bg_color={"primary"}/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/adventurers" element={<AdventurerPage/>}/>
                    <Route path="/expeditions" element={<ExpeditionsPage/>}/>
                    <Route path="/expedition_rosters" element={<ExpeditionRostersPage/>}/>
                    <Route path="/acquisitions" element={<AcquisitionsPage />}/>
                    <Route path="/disbursements" element={<DisbursementsPage/>}/>
                </Routes>
            </Router>
        </>
  );
}

export default App;
