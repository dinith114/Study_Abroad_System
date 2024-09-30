// controllers/bankController.js

const Bank = require('../models/Bank');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create a new bank with an image upload
exports.createBank = async (req, res) => {
    try {
      const { bankName, interestRate, rank, maxLoan, repaymentPeriod, purpose, documentsRequired, eligiblePersons, benefits } = req.body;
      
      if (!req.files || !req.files.bankIcon) {
        return res.status(400).json({ error: 'Bank icon is required.' });
      }
  
      const bankIcon = req.files.bankIcon;
  
      // Check file type and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB
      if (!validImageTypes.includes(bankIcon.mimetype)) {
        return res.status(400).json({ error: 'Only .jpeg, .jpg, or .png files are allowed.' });
      }
      if (bankIcon.size > fileSizeLimit) {
        return res.status(400).json({ error: 'File size should not exceed 5MB.' });
      }
  
      const uploadPath = path.join(__dirname, '..', 'uploads', bankIcon.name);
      fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
  
      bankIcon.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to upload file.' });
        }
      });
  
      const newBank = new Bank({
        _id: uuidv4(), // Set the custom ID
        bankName,
        interestRate,
        rank,
        maxLoan,
        repaymentPeriod,
        purpose,
        documentsRequired,
        eligiblePersons,
        benefits,
        bankIcon: `/uploads/${bankIcon.name}`, // Save the relative path
      });
  
      await newBank.save();
      res.status(201).json({ message: 'Bank added successfully', bank: newBank });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Get all banks
exports.getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.status(200).json(banks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single bank by ID
exports.getBankById = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);
    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' });
    }
    res.status(200).json(bank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a bank by ID
exports.updateBank = async (req, res) => {
  try {
    const existingBank = await Bank.findById(req.params.id);
    if (!existingBank) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    let bankIconPath = existingBank.bankIcon; // Preserve the existing bank icon path

    if (req.files && req.files.bankIcon) {
      const bankIcon = req.files.bankIcon;

      // Check file type and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB
      if (!validImageTypes.includes(bankIcon.mimetype)) {
        return res.status(400).json({ error: 'Only .jpeg, .jpg, or .png files are allowed.' });
      }
      if (bankIcon.size > fileSizeLimit) {
        return res.status(400).json({ error: 'File size should not exceed 5MB.' });
      }

      const uploadPath = path.join(__dirname, '..', 'uploads', bankIcon.name);
      fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

      bankIcon.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to upload file.' });
        }
      });

      // Update bankIconPath to the new image path
      bankIconPath = `/uploads/${bankIcon.name}`;
    }

    // Update the bank with new data
    const updatedBank = await Bank.findByIdAndUpdate(req.params.id, {
      ...req.body,
      bankIcon: bankIconPath,
    }, { new: true });

    res.status(200).json({ message: 'Bank updated successfully', bank: updatedBank });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete a bank by ID
exports.deleteBank = async (req, res) => {
  try {
    const deletedBank = await Bank.findByIdAndDelete(req.params.id);
    if (!deletedBank) {
      return res.status(404).json({ error: 'Bank not found' });
    }
    res.status(200).json({ message: 'Bank deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
