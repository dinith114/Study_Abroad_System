import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

const courseLevels = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
  { value: "doctorate", label: "Doctorate" },
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
  // Add more currencies as needed
];

// const Course = () => {

//   const navigate = useNavigate();

//   const handleAddNewCourse = () => {
//     navigate('/course-table');
//   }

// };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tuitionFee" && value < 0) {
      return; // Prevent negative values
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          </div>
          <div className="form-group">
            <label>Tuition Fee</label>
            <div className="tuition-fee-group">
              <Select
                value={formData.currency}
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
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Course Level</label>
            <Select
              value={formData.courseLevel}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "courseLevel")
              }
              options={courseLevels}
              placeholder="Select Course Level"
            />
          </div>
          <div className="form-group">
            <label>Course Type</label>
            <Select
              value={formData.courseType}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "courseType")
              }
              options={courseTypes}
              placeholder="Select Course Type"
            />
          </div>
        </div>
          <Link to='/course-table'>
        <button className="submit-btn">
          ADD
        </button>
        </Link>
      </form>
    </div>
  );
};

export default Course;
