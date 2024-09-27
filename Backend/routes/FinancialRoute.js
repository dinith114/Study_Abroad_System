const express = require('express');
const router = express.Router();
const financialController = require('../controllers/FinancialController');

// Create Financial Record
router.post('/financials', financialController.createFinancialRecord);

// Edit Financial Record
router.put('/editfinancials/:id', financialController.editFinancialRecord);

// Delete Financial Record
router.delete('/deletefinancials/:id', financialController.deleteFinancialRecord);

// View List of Financial Records
router.get('/viewfinancials', financialController.viewFinancialRecords);

router.get('/viewOnefinancials/:id', financialController.viewOneFinancialRecord);

// Calculate Monthly Totals
router.get('/financials/monthly/:month/:year', financialController.calculateMonthlyTotals);

// Calculate Yearly Totals
router.get('/financials/yearly/:year', financialController.calculateYearlyTotals);

module.exports = router;
