const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  tuitionFee: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  intake: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    required: true,
    enum: ['undergraduate', 'postgraduate', 'internships'],  // Update to match your frontend
  },
  courseType: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'online'],  // Fix the enum values to be lowercase and hyphenated
  },
});

const Course = mongoose.model('Course', courseSchema);


module.exports = Course;
