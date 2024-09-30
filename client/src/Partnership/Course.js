import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const courseLevels = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "internships", label: "Internships" },
];

const courseTypes = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "online", label: "Online" },
];

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
];

const Course = () => {
  const [formData, setFormData] = useState({
    universityName: "",
    courseName: "",
    duration: "",
    tuitionFee: "",
    currency: null,
    intake: "",
    courseLevel: null,
    courseType: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // To redirect after form submission

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.universityName) {
      formErrors.universityName = "University Name is required.";
      isValid = false;
    }

    if (!formData.courseName) {
      formErrors.courseName = "Course Name is required.";
      isValid = false;
    }

    if (!formData.duration) {
      formErrors.duration = "Duration is required.";
      isValid = false;
    }

    if (!formData.tuitionFee || formData.tuitionFee <= 0) {
      formErrors.tuitionFee = "Tuition Fee must be a positive number.";
      isValid = false;
    }

    if (!formData.currency) {
      formErrors.currency = "Currency is required.";
      isValid = false;
    }

    if (!formData.intake) {
      formErrors.intake = "Intake is required.";
      isValid = false;
    }

    if (!formData.courseLevel) {
      formErrors.courseLevel = "Course Level is required.";
      isValid = false;
    }

    if (!formData.courseType) {
      formErrors.courseType = "Course Type is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    switch (name) {
      case "universityName":
      case "courseName":
        // Allow only letters, spaces, and some special characters (e.g., - and ')
        if (/^[a-zA-Z\s-']*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;
        
      case "duration":
        // Allow letters, numbers, and spaces
        if (/^[a-zA-Z0-9\s]*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;
        
      case "intake":
        // Allow only letters and spaces
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;

      case "tuitionFee":
        // Allow only positive numbers
        if (/^\d*\.?\d*$/.test(value)) {
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

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption?.value || null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    
    if (!validateForm()) {
      return; // Do not submit if validation fails
    }
    
    try {
      const response = await axios.post("http://localhost:5000/course/addCourse", formData); // Replace with your API URL
      console.log("Data submitted successfully:", response.data);
      
      // Reset form fields after successful submission
      setFormData({
        universityName: "",
        courseName: "",
        duration: "",
        tuitionFee: "",
        currency: null,
        intake: "",
        courseLevel: null,
        courseType: null,
      });
      
      // Navigate to course table page after submission
      navigate("/course-table");
      
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-headline">ADD NEW COURSE</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
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
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter Course Name"
            />
            {errors.courseName && <span className="error-message">{errors.courseName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter Duration"
            />
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>
          <div className="form-group">
            <label>Tuition Fee</label>
            <div className="tuition-fee-group">
              <Select
                value={currencyOptions.find(option => option.value === formData.currency)}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "currency")
                }
                options={currencyOptions}
                placeholder="Select Currency"
                className="currency-select"
              />
              <input
                type="number"
                name="tuitionFee"
                value={formData.tuitionFee}
                onChange={handleChange}
                placeholder="Enter Tuition Fee"
                step="0.01"
                min="0"
              />
            </div>
            {errors.tuitionFee && <span className="error-message">{errors.tuitionFee}</span>}
            {errors.currency && <span className="error-message">{errors.currency}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Intake</label>
            <input
              type="text"
              name="intake"
              value={formData.intake}
              onChange={handleChange}
              placeholder="Enter Intake"
            />
            {errors.intake && <span className="error-message">{errors.intake}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Course Level</label>
            <Select
              value={courseLevels.find(option => option.value === formData.courseLevel)}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "courseLevel")
              }
              options={courseLevels}
              placeholder="Select Course Level"
            />
            {errors.courseLevel && <span className="error-message">{errors.courseLevel}</span>}
          </div>
          <div className="form-group">
            <label>Course Type</label>
            <Select
              value={courseTypes.find(option => option.value === formData.courseType)}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "courseType")
              }
              options={courseTypes}
              placeholder="Select Course Type"
            />
            {errors.courseType && <span className="error-message">{errors.courseType}</span>}
          </div>
        </div>

        <button className="submit-btn" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Course;
