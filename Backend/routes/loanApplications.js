const express = require('express');
const router = express.Router();
const {
  createLoanApplication,
  getLoanApplications,
  getLoanApplicationById,
  updateLoanApplication,
  deleteLoanApplication,
} = require('../controllers/loanApplicationController');

// Create a new loan application
router.post('/add', createLoanApplication);

// Get all loan applications
router.get('/list', getLoanApplications);

// Get a loan application by ID
router.get('/view/:id', getLoanApplicationById);

// Update a loan application by ID
router.put('/update/:id', updateLoanApplication);

// Delete a loan application by ID
router.delete('/delete/:id', deleteLoanApplication);

module.exports = router;
