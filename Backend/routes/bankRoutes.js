// routes/bankRoutes.js

const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

// Create a new bank with file upload
router.post('/add', bankController.createBank);

// Get all banks
router.get('/list', bankController.getAllBanks);

// Get a single bank by ID
router.get('/view/:id', bankController.getBankById);

// Update a bank by ID
router.put('/update/:id', bankController.updateBank);

// Delete a bank by ID
router.delete('/delete/:id', bankController.deleteBank);

module.exports = router;
