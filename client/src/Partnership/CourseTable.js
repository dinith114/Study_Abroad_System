import React from 'react';
import './CourseTable.css';

const courses = [
  {
    university: 'University of Cambridge',
    course: 'PhD in Zoology',
    duration: '03 Year',
    tuitionFee: '97056 GBP',
    intake: 'Oct',
    courseLevel: 'Doctoral Degree/PhD',
    courseType: 'Full Time'
  },
  {
    university: 'University of Melbourne',
    course: 'Doctoral Program in Marketing',
    duration: '05 Year',
    tuitionFee: '43808 AUD/ Year',
    intake: 'Jan, Feb, July',
    courseLevel: 'Doctoral Degree/PhD',
    courseType: 'Full Time'
  },
  {
    university: 'McGill University',
    course: 'Professional Master of Architecture',
    duration: '01 Year',
    tuitionFee: '13470 CAD',
    intake: 'Sep',
    courseLevel: 'Masters/PG Degree',
    courseType: 'Full Time'
  },
  {
    university: 'The University of Edinburgh',
    course: 'MA Accounting and Finance',
    duration: '04 Year',
    tuitionFee: '92400 GBP',
    intake: 'Feb',
    courseLevel: 'Masters/PG Degree',
    courseType: 'Full Time'
  },
  {
    university: 'University of Auckland',
    course: 'Doctor of Philosophy - Technology and Innovation',
    duration: '04 Year',
    tuitionFee: '30636 NZD',
    intake: 'Jan - Sep',
    courseLevel: 'Doctoral Degree/PhD',
    courseType: 'Full Time'
  },
  {
    university: 'Ohio State University',
    course: 'Master of Science in Welding Engineering',
    duration: '01 Year',
    tuitionFee: '12138 USD',
    intake: 'Jan, May, Aug',
    courseLevel: 'Masters/PG Degree',
    courseType: 'Online'
  }
];

const CourseTable = () => {
  return (
    <div className="course-table-container">
      <h2 className="table-headline">COURSE DETAILS</h2>
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
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.university}</td>
                <td>{course.course}</td>
                <td>{course.duration}</td>
                <td>{course.tuitionFee}</td>
                <td>{course.intake}</td>
                <td>{course.courseLevel}</td>
                <td>{course.courseType}</td>
                <td>
                  <button className="edit-button">✏️</button>
                  <button className="delete-button">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-course-button">ADD NEW COURSES</button>
    </div>
  );
};

export default CourseTable;