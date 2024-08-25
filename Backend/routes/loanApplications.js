// routes/loanApplications.js
const express = require('express');
const router = express.Router();
const { createLoanApplication, getLoanApplications } = require('../controllers/loanApplicationController');

// Create a new loan application
router.post('/add', createLoanApplication);

// Get all loan applications
router.get('/view-list', getLoanApplications);

console.log("hi");
console.log("hi");

module.exports = router;
