const mongoose = require("mongoose");

const PartnershipSchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true,
  },
  ranking: {
    type: String,
    required: true,
  },
  foundedIn: {
    type: Number,
    required: true,
  },
  institutionType: {
    type: String,
    required: true,
  },
  country: {
    type: {
      value: String,
      label: String,
      flag: String,
    },
    required: true, // Correctly moved `required` outside of the `type` object
  },
  address: {
    type: String,
    required: true,
  },
});

const Partnership = mongoose.model("Partnership", PartnershipSchema);
module.exports = Partnership;
