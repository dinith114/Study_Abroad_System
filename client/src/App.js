import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { ParticipantList } from "./Marketing/ParticipantList";
import EventForm from "./Marketing/EventForm";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/creatEvent" element={<EventForm />} />
          <Route path="/participantList" element={<ParticipantList />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};
export default App;
