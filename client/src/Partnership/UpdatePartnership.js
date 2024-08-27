import React, { useState, useEffect } from "react";
import Select from "react-select";
import Flag from "react-world-flags";
import "./PartnershipForm.css";
import { useNavigate } from "react-router-dom";

const countryOptions = [
  { value: "AU", label: "Australia", flag: "AU" },
  { value: "US", label: "United States", flag: "US" },
  { value: "GB", label: "United Kingdom", flag: "GB" },
  // Add more countries as needed
];

const UpdatePartnership = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    universityName: "",
    ranking: "",
    foundedIn: "",
    institutionType: "",
    country: { value: "AU", label: "Australia", flag: "AU" }, // Default country
    address: "",
    ...initialData, // Prefill with initial data if available
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData); // Call the onSubmit function passed as a prop
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formatOptionLabel = ({ label, flag }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Flag code={flag} alt={label} style={{ width: 20, height: 15, marginRight: 10 }} />
      {label}
    </div>
  );

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleUpdateUniversity = () => {
    navigate('/partnership-table'); // Navigate to the PartnershipForm page
  };

  return (
    <div className="form-container">
      <h2 className="form-headline">UPDATE PARTNERSHIP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>University Name</label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            placeholder="Enter University Name"
          />
        </div>
        <div className="form-group">
          <label>Ranking</label>
          <input
            type="text"
            name="ranking"
            value={formData.ranking}
            onChange={handleChange}
            placeholder="Enter Ranking"
          />
        </div>
        <div className="form-group">
          <label>Founded In</label>
          <input
            type="number"
            name="foundedIn"
            value={formData.foundedIn}
            onChange={handleChange}
            placeholder="Enter the Year"
            min="2024"
          />
        </div>
        <div className="form-group">
          <label>Institution Type</label>
          <input
            type="text"
            name="institutionType"
            value={formData.institutionType}
            onChange={handleChange}
            placeholder="Enter Institution Type"
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <Select
            value={formData.country}
            onChange={handleCountryChange}
            options={countryOptions}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </div>
        <button type="submit" className="submit-btn" onClick={handleUpdateUniversity}>
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdatePartnership;
