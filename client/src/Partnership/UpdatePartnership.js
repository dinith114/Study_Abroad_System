import React, { useState, useEffect } from "react";
import Select from "react-select";
import Flag from "react-world-flags";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import axios from "axios";
import "./PartnershipForm.css";

const countryOptions = [
  { value: "AU", label: "Australia", flag: "AU" },
  { value: "US", label: "United States", flag: "US" },
  { value: "GB", label: "United Kingdom", flag: "GB" },
  // Add more countries as needed
];

const UpdatePartnership = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [formData, setFormData] = useState({
    universityName: "",
    ranking: "",
    foundedIn: "",
    institutionType: "",
    country: { value: "AU", label: "Australia", flag: "AU" }, // Set a default country value
    address: "",
  });
  const [loading, setLoading] = useState(true);  // New loading state
  const [error, setError] = useState("");  // Error state for any fetch issues

  useEffect(() => {
    const fetchPartnershipData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/partnership/getPartnershipsById/${id}`
        );
        
        const partnershipData = response.data;

        console.log("Fetched Partnership Data:", partnershipData);

        // Default country if not found in response
        const defaultCountry = { value: "AU", label: "Australia", flag: "AU" };

        // Find the selected country or set to default if not available
        const selectedCountry =
          countryOptions.find(
            (option) => option.value === partnershipData.country?.value
          ) || defaultCountry;

        // Update formData state with fetched data
        setFormData({
          universityName: partnershipData?.data?.universityName || "",
          ranking: partnershipData?.data?.ranking || "",
          foundedIn: partnershipData?.data?.foundedIn || "",
          institutionType: partnershipData?.data?.institutionType || "",
          country: selectedCountry || "",  // Ensure selectedCountry is not undefined
          address: partnershipData?.data?.address || "",
        });
        

        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        console.error(
          "Error fetching partnership data:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to fetch partnership data. Redirecting to the partnership table.");
        setLoading(false);  // Stop loading on error
      }
    };

    fetchPartnershipData();
  }, [id, navigate]);

  const handleCountryChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedOption,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/partnership/updatePartnership/${id}`, {
        ...formData,
        country: { // Send country as an object
          value: formData.country.value,
          label: formData.country.label,
          flag: formData.country.flag,
        },
      });
      navigate("/partnership-table");
    } catch (error) {
      console.error("There was an error updating the partnership!", error);
      alert("Failed to update partnership. Please try again.");
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

  if (loading) {
    return <p>Loading partnership data...</p>;  // Show loading message while fetching
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/partnership-table")}>Go Back</button>
      </div>
    );  // Show error message and a "Go Back" button if fetching fails
  }

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
            required
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
            min="1000"
            required
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
            required
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
            required
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
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdatePartnership;
