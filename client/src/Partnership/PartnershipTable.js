import React from "react";
import { useNavigate } from "react-router-dom";
import './PartnershipTable.css';


const universities = [
  {
    name: "University of Cambridge",
    country: "England",
    address: "England, United Kingdom",
    founded: "1209",
    type: "Public",
    flag: "🇬🇧",
  },
  {
    name: "University of Melbourne",
    country: "Australia",
    address: "Melbourne, Victoria, Australia",
    founded: "1853",
    type: "Public",
    flag: "🇦🇺",
  },
  {
    name: "McGill University",
    country: "Canada",
    address: "Montreal, Quebec, Canada",
    founded: "1821",
    type: "Public",
    flag: "🇨🇦",
  },
  
];

const PartnershipTable = () => {

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAddNewUniversity = () => {
    navigate('/partnership-form'); // Navigate to the PartnershipForm page
  };

  const handleUpdateUniversity = () => {
    navigate('/update-partnership'); // Navigate to the PartnershipForm page
  };


  return (
    <div className="table-container">
        <h2 className="table-headline">PARTNERSHIP DETAILS</h2>
      <table>
        <thead>
          <tr>
            <th>University Name</th>
            <th>Country</th>
            <th>Address</th>
            <th>Founded In</th>
            <th>Institution Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((uni, index) => (
            <tr key={index}>
              <td>{uni.name}</td>
              <td>{uni.flag} {uni.country}</td>
              <td>{uni.address}</td>
              <td>{uni.founded}</td>
              <td>{uni.type}</td>
              <td>
              <td>
                  <button className="edit-button" onClick={handleUpdateUniversity}>✏️</button>
                  <button className="delete-button">🗑️</button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-new-university" onClick={handleAddNewUniversity}>Add New University</button>
    </div>
  );
};

export default PartnershipTable;
