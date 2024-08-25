// models/loanApplication.js
const mongoose = require('mongoose');

// Define the schema for a loan application
const loanApplicationSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Documenting', 'Processing', 'Approve', 'Rejected'],
    default: 'Documenting',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

console.log("hi");
console.log("hi");

// Export the model
const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);
module.exports = LoanApplication;
