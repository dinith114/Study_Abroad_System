const mongoose = require('mongoose');

// Define a schema for the bank model
const bankSchema = new mongoose.Schema({
  _id: {
    type: String, // Change _id to a String to accommodate UUID or other custom IDs
    required: true,
  },
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  maxLoan: {
    type: Number,
    required: true,
  },
  repaymentPeriod: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
    trim: true,
  },
  documentsRequired: [
    {
      type: String,
      required: true,
    },
  ],
  eligiblePersons: [
    {
      type: String,
      required: true,
    },
  ],
  benefits: [
    {
      type: String,
      required: true,
    },
  ],
  bankIcon: {
    type: String, // This will store the file path or URL of the uploaded image
    required: true,
  },
});

// Export the model
module.exports = mongoose.model('Bank', bankSchema);
