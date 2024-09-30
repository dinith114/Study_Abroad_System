// models/loanApplication.js
const mongoose = require("mongoose");

// Define the schema for a loan application
const registerEventSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  aboutEvent: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Not Verfied",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  counselor:{
    type:String,
  },
  eventName:{
    type:String
  }
});

// Export the model
const EventRegister = mongoose.model("EventRegister", registerEventSchema);
module.exports = EventRegister;
