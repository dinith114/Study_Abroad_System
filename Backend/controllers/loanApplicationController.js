const LoanApplication = require('../models/loanApplication');

// Create a new loan application
const createLoanApplication = async (req, res) => {
  try {
    const newLoanApplication = new LoanApplication(req.body);
    await newLoanApplication.save();
    res.status(201).json(newLoanApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get all loan applications
const getLoanApplications = async (req, res, next) => {
  try {
    const loanApplications = await LoanApplication.find();
    res.json(loanApplications);
  } catch (err) {
    next(err); // Pass error to the global error handler
  }
};

// Get a loan application by ID
const getLoanApplicationById = async (req, res, next) => {
  try {
    const loanApplication = await LoanApplication.findById(req.params.id);
    if (!loanApplication) {
      return res.status(404).json({ error: 'Loan application not found' });
    }
    res.json(loanApplication);
  } catch (err) {
    next(err); // Pass error to the global error handler
  }
};

// Update a loan application by ID
// Backend
const updateLoanApplication = async (req, res, next) => {
  try {
    const updateFields = {};

    // Populate updateFields only with valid fields
    if (req.body.studentId) updateFields.studentId = req.body.studentId;
    if (req.body.firstName) updateFields.firstName = req.body.firstName;
    if (req.body.lastName) updateFields.lastName = req.body.lastName;
    if (req.body.address) updateFields.address = req.body.address;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
    if (req.body.birthDate) updateFields.birthDate = req.body.birthDate;
    if (req.body.nic) updateFields.nic = req.body.nic;
    if (req.body.university) updateFields.university = req.body.university;
    if (req.body.program) updateFields.program = req.body.program;
    if (req.body.totalProgramFee) updateFields.totalProgramFee = req.body.totalProgramFee;
    if (req.body.registrationFee) updateFields.registrationFee = req.body.registrationFee;
    if (req.body.totalLoanAmount) updateFields.totalLoanAmount = req.body.totalLoanAmount;
    if (req.body.selectedBank) updateFields.selectedBank = req.body.selectedBank;

    // Debugging the update fields
    console.log('Update Fields:', updateFields);

    const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedLoanApplication) {
      return res.status(404).json({ error: 'Loan application not found' });
    }

    res.json(updatedLoanApplication);
  } catch (err) {
    console.error('Update Error:', err);
    next(err);
  }
};




// Delete a loan application by ID
const deleteLoanApplication = async (req, res, next) => {
  try {
    const deletedLoanApplication = await LoanApplication.findByIdAndDelete(req.params.id);
    if (!deletedLoanApplication) {
      return res.status(404).json({ error: 'Loan application not found' });
    }
    res.json({ message: 'Loan application deleted successfully' });
  } catch (err) {
    next(err); // Pass error to the global error handler
  }
};

module.exports = {
  createLoanApplication,
  getLoanApplications,
  getLoanApplicationById,
  updateLoanApplication,
  deleteLoanApplication,
};
