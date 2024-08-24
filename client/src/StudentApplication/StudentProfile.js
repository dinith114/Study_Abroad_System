import React, { useState, useEffect } from 'react';
import { Steps, Button } from 'antd';
import axios from 'axios';

const { Step } = Steps;

function StudentProfile({ studentId }) {
  const [studentData, setStudentData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    // Fetch student data from the database
    axios.get(`/api/students/${studentId}`)
      .then(response => {
        setStudentData(response.data);
        setCurrentStatus(response.data.status); // Assuming 'status' is part of the student data
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, [studentId]);

  const handleStatusChange = (newStatus) => {
    axios.put(`/api/students/${studentId}/status`, { status: newStatus })
      .then(response => {
        setCurrentStatus(newStatus);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-profile">
      {/* Display student information */}
      <h2>Personal Information</h2>
      <p>Full Name: {studentData.fullName}</p>
      <p>First Name: {studentData.firstName}</p>
      <p>Last Name: {studentData.lastName}</p>
      <p>Date of Birth: {studentData.dob}</p>
      {/* Add other fields accordingly */}
      
      <h2>Education Level</h2>
      {/* Display education level, financial status, etc. */}

      {/* Progress Bar for Status */}
      <Steps current={currentStatus}>
        <Step title="Registered" onClick={() => handleStatusChange(0)} />
        <Step title="Under Review" onClick={() => handleStatusChange(1)} />
        <Step title="Accepted" onClick={() => handleStatusChange(2)} />
        <Step title="Finalized" onClick={() => handleStatusChange(3)} />
      </Steps>
      
      {/* Optionally, add a button to confirm changes */}
      <Button type="primary" onClick={() => handleStatusChange(currentStatus)}>Confirm</Button>
    </div>
  );
}

export default StudentProfile;


