const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanApplicationSchema = new Schema({
  studentId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phoneNumber: { type: String, required: true },
  birthDate: { type: Date, required: true },
  nic: { type: String, unique: true, required: true }, // Ensure `nic` is unique
  university: { type: String, required: true },
  program: { type: String, required: true },
  totalProgramFee: { type: Number, required: true },
  registrationFee: { type: Number, required: true },
  totalLoanAmount: { type: Number, required: true },
  selectedBank: { type: String, required: true },
  status: { type: String, default: 'Documenting' }, // Add status field with default value
  steps: {
    formCompleted: { type: Boolean, default: false },
    documentsUploaded: { type: Boolean, default: false },
    qualificationsCompleted: { type: Boolean, default: false },
    approvalReceived: { type: Boolean, default: false },
    mortgageProvided: { type: Boolean, default: false },
  },
}, { timestamps: true });

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);
module.exports = LoanApplication;
