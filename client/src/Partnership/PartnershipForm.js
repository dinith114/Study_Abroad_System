import React, { useState } from "react";
import Select from "react-select";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PartnershipForm.css";

const countryOptions = [
  { value: "AU", label: "Australia", flag: "AU" },
  { value: "US", label: "United States", flag: "US" },
  { value: "GB", label: "United Kingdom", flag: "GB" },
  { value: "CA", label: "Canada", flag: "CA" },
  { value: "NZ", label: "New Zealand", flag: "NZ" },
];

const PartnershipForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityName: "",
    ranking: "",
    foundedIn: "",
    institutionType: "",
    country: { value: "AU", label: "Australia", flag: "AU" },
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption,
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    let isValid = true;

    if (!formData.universityName) {
      validationErrors.universityName = "University Name is required.";
      isValid = false;
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.universityName)) {
      validationErrors.universityName = "University Name can only contain letters, spaces, hyphens, and apostrophes.";
      isValid = false;
    }

    if (!formData.ranking) {
      validationErrors.ranking = "Ranking is required.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.ranking)) {
      validationErrors.ranking = "Ranking can only contain letters, numbers, and spaces.";
      isValid = false;
    }

    if (!formData.foundedIn) {
      validationErrors.foundedIn = "Founded Year is required.";
      isValid = false;
    } else if (!/^\d+$/.test(formData.foundedIn) || formData.foundedIn < 1000 || formData.foundedIn > new Date().getFullYear()) {
      validationErrors.foundedIn = "Enter a valid year between 1000 and the current year.";
      isValid = false;
    }

    if (!formData.institutionType) {
      validationErrors.institutionType = "Institution Type is required.";
      isValid = false;
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.institutionType)) {
      validationErrors.institutionType = "Institution Type can only contain letters, spaces, hyphens, and apostrophes.";
      isValid = false;
    }

    if (!formData.address) {
      validationErrors.address = "Address is required.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s,.#-]+$/.test(formData.address)) {
      validationErrors.address = "Address can only contain letters, numbers, spaces, commas, periods, and hyphens.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "universityName":
      case "institutionType":
        if (/^[a-zA-Z\s-']*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case "ranking":
        if (/^[a-zA-Z0-9\s]*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case "address":
        if (/^[a-zA-Z0-9\s,.#-]*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case "foundedIn":
        if (/^\d*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/partnership/addPartnership", {
        universityName: formData.universityName,
        ranking: formData.ranking,
        foundedIn: formData.foundedIn,
        institutionType: formData.institutionType,
        country: {
          value: formData.country.value,
          label: formData.country.label,
          flag: formData.country.flag,
        },
        address: formData.address,
      });

      console.log(response.data);
      navigate("/partnership-table");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
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

  return (
    <div className="form-container">
      <h2 className="form-headline">ADD NEW PARTNERSHIP</h2>
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
          {errors.universityName && <span className="error-message">{errors.universityName}</span>}
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
          {errors.ranking && <span className="error-message">{errors.ranking}</span>}
        </div>
        <div className="form-group">
          <label>Founded In</label>
          <input
            type="number"
            name="foundedIn"
            value={formData.foundedIn}
            onChange={handleChange}
            placeholder="Enter the Year"
            min="1000"
          />
          {errors.foundedIn && <span className="error-message">{errors.foundedIn}</span>}
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
          {errors.institutionType && <span className="error-message">{errors.institutionType}</span>}
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
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PartnershipForm;
