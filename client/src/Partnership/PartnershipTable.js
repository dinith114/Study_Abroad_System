import React, { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";
import Flag from "react-world-flags"; // Import the Flag component
import './PartnershipTable.css';

const PartnershipTable = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();
  

  const handleAddNewUniversity = () => {
    navigate('/partnership-form');
  };

  const handleUpdateUniversity = (universityId) => {
    navigate(`/update-partnership?id=${universityId}`);
  };

  const handleDeleteUniversity = async (universityId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this university?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/partnership/deletePartnership/${universityId}`);
        setUniversities(universities.filter(uni => uni._id !== universityId)); // Remove the deleted university from state
      } catch (error) {
        console.error("There was an error deleting the university!", error);
      }
    }
  };

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/partnership/getPartnerships");
        if (response.data && Array.isArray(response.data.data)) {
          setUniversities(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the universities!", error);
      }
    };

    fetchUniversities();
  }, []);

  // Filter universities based on the search term
  const filteredUniversities = universities.filter((uni) =>
    uni.universityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <h2 className="table-headline">PARTNERSHIP DETAILS</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by University Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni) => (
              <tr key={uni._id}>
                <td>{uni.universityName}</td>
                <td>
                  <Flag code={uni.country.flag} alt={uni.country.label} style={{ width: '30px', height: '20px', marginRight: '8px' }} />
                  {uni.country.label}
                </td>
                <td>{uni.address}</td>
                <td>{uni.foundedIn}</td>
                <td>{uni.institutionType}</td>
                <td>
                  <button className="edit-button" onClick={() => handleUpdateUniversity(uni._id)}>✏️</button>
                  <button className="delete-button" onClick={() => handleDeleteUniversity(uni._id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No universities found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="add-new-university" onClick={handleAddNewUniversity}>Add New University</button>
    </div>
  );
};

export default PartnershipTable;
