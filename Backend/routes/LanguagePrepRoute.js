const express = require('express');
const router = express.Router();
const languagePrepController = require('../controllers/LanguagePrepController');

// Create Record
router.post('/language-prep', languagePrepController.createRecord);

// View Records
router.get('/viewlanguage-prep', languagePrepController.viewRecords);

router.get('/viewpackage', languagePrepController.viewPackages);

// Send Email
router.post('/language-prep/:id/send-email', languagePrepController.sendEmail);


router.get('/viewOnepackage/:id', languagePrepController.viewOnePackage);



router.put('/editpackage/:id', languagePrepController.updatePackage);



router.delete('/deletepackage/:id', languagePrepController.deletePackage);


module.exports = router;
