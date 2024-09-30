const express = require('express');
const router = express.Router();
const PartnershipController = require('../controllers/PartnershipController');

// Route to add a new university partnership
router.post('/addPartnership', PartnershipController.addPartnership);

// Route to get all university partnerships
router.get('/getPartnerships', PartnershipController.getPartnerships);

// Route to get a single university partnership by ID
router.get('/getPartnershipsById/:id', PartnershipController.getPartnershipsById);

// Route to update a university partnership by ID
router.put('/updatePartnership/:id', PartnershipController.updatePartnership);

// Route to delete a university partnership by ID
router.delete('/deletePartnership/:id', PartnershipController.deletePartnership);

module.exports = router;
