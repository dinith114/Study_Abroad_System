import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from 'axios'; // Ensure axios is installed
import { useParams, useNavigate ,useLocation} from 'react-router-dom'; // Import useParams and useNavigate
import './CourseTable.css'; // Import CSS for styling

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

const UpdateCourse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // Get the course ID from the URL
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
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/course/getCourseById/${id}`);
        console.log("response",response)
        console.log("response",response.data.data.universityName)
        setFormData({
          universityName: response.data.data.universityName,
          courseName: response.data.data.courseName,
          duration: response.data.data.duration,
          tuitionFee: response.data.data.tuitionFee,
          currency: currencyOptions.find(option => option.value === response.data.data.currency),
          intake: response.data.data.intake,
          courseLevel: courseLevels.find(option => option.value === response.data.data.courseLevel),
          courseType: courseTypes.find(option => option.value === response.data.data.courseType),
        });

        console.log("formDate",formData)
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/course/updateCourse/${id}`, {
        ...formData,
        currency: formData.currency?.value,
        courseLevel: formData.courseLevel?.value,
        courseType: formData.courseType?.value,
      });
      navigate('/course-table'); // Redirect to course table after update
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-headline">UPDATE COURSE</h2>
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

        <button type="submit" className="submit-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
