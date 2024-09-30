const Course = require('../models/CourseModel');

// Controller to add a new course
const addCourse = async (req, res) => {
  try {
    const { universityName, courseName, duration, tuitionFee, currency, intake, courseLevel, courseType } = req.body;
    
    // Create a new course document
    const newCourse = new Course({
      universityName,
      courseName,
      duration,
      tuitionFee,
      currency,
      intake,
      courseLevel,
      courseType,
    });

    // Save the new course to the database
    await newCourse.save();
    
    res.status(201).json({ message: 'Course added successfully', data: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add course', error: error.message });
  }
};

// Controller to get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ message: 'Courses retrieved successfully', data: courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve courses', error: error.message });
  }
};

// Controller to get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course retrieved successfully', data: course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve course', error: error.message });
  }
};



// Controller to update a course by ID
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { universityName, courseName, duration, tuitionFee, currency, intake, courseLevel, courseType } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { universityName, courseName, duration, tuitionFee, currency, intake, courseLevel, courseType },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', data: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// Controller to delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully', data: deletedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

module.exports = {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
