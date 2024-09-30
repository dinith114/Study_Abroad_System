import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseTable.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// For PDF generation (optional)
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  // Fetch courses from the backend when the component loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/course/getCourses');
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Delete course handler
  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/course/deleteCourse/${courseId}`);
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        console.error('There was an error deleting the course!', error);
      }
    }
  };

  // Update course handler
  const handleUpdateCourse = (courseId) => {
    navigate(`/update-course?id=${courseId}`);
  };

  // Search and highlight matching university name
  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.universityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate CSV report
  const generateCSVReport = () => {
    const csvHeader = ['University Name', 'Course Name', 'Duration', 'Tuition Fee', 'Intake', 'Course Level', 'Course Type'];
    const csvRows = filteredCourses.map(course => [
      course.universityName,
      course.courseName,
      course.duration,
      `${course.tuitionFee} ${course.currency}`,
      course.intake,
      course.courseLevel,
      course.courseType
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + [csvHeader, ...csvRows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "course_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Generate PDF report using jsPDF
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Course Details Report", 20, 10);
    doc.autoTable({
      head: [['University Name', 'Course Name', 'Duration', 'Tuition Fee', 'Intake', 'Course Level', 'Course Type']],
      body: filteredCourses.map(course => [
        course.universityName,
        course.courseName,
        course.duration,
        `${course.tuitionFee} ${course.currency}`,
        course.intake,
        course.courseLevel,
        course.courseType
      ])
    });
    doc.save('course_report.pdf');
  };

  return (
    <div className="course-table-container">
      <h2 className="table-headline">COURSE DETAILS</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by University Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="course-table">
          <thead>
            <tr>
              <th>University Name</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Tuition Fee</th>
              <th>Intake</th>
              <th>Course Level</th>
              <th>Course Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course._id}>
                <td>{getHighlightedText(course.universityName, searchTerm)}</td>
                <td>{course.courseName}</td>
                <td>{course.duration}</td>
                <td>{course.tuitionFee} {course.currency}</td>
                <td>{course.intake}</td>
                <td>{course.courseLevel}</td>
                <td>{course.courseType}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleUpdateCourse(course._id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(course._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-buttons">
        {/* Generate CSV Report Button */}
        <button className="generate-report-button" onClick={generateCSVReport}>
          GENERATE CSV REPORT
        </button>

        {/* Generate PDF Report Button */}
        <button className="generate-report-button" onClick={generatePDFReport}>
          GENERATE PDF REPORT
        </button>
      </div>

      <Link to='/course'>
        <button className="add-course-button">ADD NEW COURSES</button>
      </Link>
    </div>
  );
};

export default CourseTable;
