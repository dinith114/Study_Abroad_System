// models/loanApplication.js
const mongoose = require("mongoose");

// Define the schema for a loan application
const eventCreateSchema = new mongoose.Schema({

  eventType: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  studyLevel: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  institutions: {
    type: String,
    required: true,
  },
});

// Export the model
const EventCreate = mongoose.model("EventCreate", eventCreateSchema);
module.exports = EventCreate;
