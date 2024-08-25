// controllers/loanApplicationController.js

const LoanApplication = require('../models/loanApplication');

// Create a new loan application
const createLoanApplication = async (req, res) => {
  try {
    const newLoanApplication = new LoanApplication(req.body);
    await newLoanApplication.save();
    res.status(201).json(newLoanApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all loan applications
const getLoanApplications = async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find();
    res.json(loanApplications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

console.log("hi");

module.exports = {
  createLoanApplication,
  getLoanApplications,
};
 