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
import ParticipantList from "./Marketing/ParticipantList";
import EventForm from "./Marketing/EventForm";
import EditEventForm from "./Marketing/EventFormedit";
import EventMain from "./Marketing/EventMain";
import LoanApp from "./Loan/LoanApp";
import LoanAppList from "./Loan/LoanAppList";
import LoanDetailsPage from "./Loan/LoanDeatilsPage";
import EditLoanApplication from "./Loan/EditLoanApplication";
import ViewBanks from "./Loan/ViewBanks";
import AddNewBank from "./Loan/AddNewBank";
import EditBank from "./Loan/EditBank";
import AddStudent from "./StudentApplication/AddStudent";
import EditStudent from "./StudentApplication/EditStudent";
import StudentProfile from "./StudentApplication/StudentProfile";
import StudentList from "./StudentApplication/StudentList";
import EventMainStudent from "./Marketing/EventMainStudent";
import EventRegister from "./Marketing/EventRegister";
import RegisteredStudentList from "./StudentApplication/RegisteredStudentsList";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/creatEvent" element={<EventForm />} />
          <Route path="/EventForm-edit" element={<EditEventForm />} />
          <Route path="/participantList" element={<ParticipantList />} />
          <Route path="/loan-app" element={<LoanApp />} />
          <Route path="/eventMain" element={<EventMain />} />
          <Route path="/eventMainStudent" element={<EventMainStudent />} />
          <Route path="/eventRegister" element={<EventRegister/>} />
          <Route path="/loan-app-list" element={<LoanAppList />} />
          <Route path="/loan-app-view/:id" element={<LoanDetailsPage />} />
          <Route path="/loan-app-edit/:id" element={<EditLoanApplication />} />
          <Route path="/bank-list" element={<ViewBanks />} />
          <Route path="/bank-add" element={<AddNewBank />} />
          <Route path="/bank-edit/:id" element={<EditBank />} />{" "}
          {/* Route for editing a bank */} 
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/editStudent" element={<EditStudent />} />
          <Route path="/studentProfile" element={<StudentProfile />} />
          <Route path="/studentList" element={<StudentList />} />
          <Route path="/registeredStudentList" element={<RegisteredStudentList />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};
export default App;
