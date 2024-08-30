// models/loanApplication.js
const mongoose = require('mongoose');

// Define the schema for a loan application
const studentApplicationSchema = new mongoose.Schema({
  studentFullName: {
    type: String,
    required: true,
  },
  studentFirstName: {
    type: String,
    required: true,
  },
  studentLastName: {
    type: String,
    required: true,
  },
  studentDob: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  /*status: {
    type: String,
    enum: ['Documenting', 'Processing', 'Approve', 'Rejected'],
    default: 'Documenting',
  },*/
  address: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  currentlyCompleted: {
    type: String,
  },
  otherQualifications: {
    type: String,
  },
  ieltsStatus: {
    type: String,
  },
  incomeLevel: {
    type: String,
  },
  financeSType: {
    type: String,
  },
  preferCourse: {
    type: String,
  },
  preferCountry: {
    type: String,
  },
  preferUniversity: {
    type: String,
  }
  
});

console.log("hi");
console.log("hi");

// Export the model
const StudentApplicationModel = mongoose.model('StudentApplicationModel', studentApplicationSchema);
module.exports = StudentApplicationModel;
