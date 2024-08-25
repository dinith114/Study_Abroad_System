import React from "react";
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
  {
    name: "The University of Edinburgh",
    country: "England",
    address: "Edinburgh, Scotland, United Kingdom",
    founded: "1583",
    type: "Public",
    flag: "🇬🇧",
  },
  {
    name: "University of Auckland",
    country: "New Zealand",
    address: "Auckland, North Island, New Zealand",
    founded: "1883",
    type: "Public",
    flag: "🇳🇿",
  },
  {
    name: "Ohio State University",
    country: "United States",
    address: "Columbus, Ohio, United States",
    founded: "1870",
    type: "Public",
    flag: "🇺🇸",
  },
  {
    name: "Ohio State University",
    country: "United States",
    address: "Columbus, Ohio, United States",
    founded: "1870",
    type: "Public",
    flag: "🇺🇸",
  },
];

const PartnershipTable = () => {
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
                  <button className="edit-button">✏️</button>
                  <button className="delete-button">🗑️</button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-new-university">Add New University</button>
    </div>
  );
};

export default PartnershipTable;
