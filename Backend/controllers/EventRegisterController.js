const Register = require("../models/EventRegisterModel");

const createRegisterEvent = async (req, res) => {
  try {
    console.log("req", req.files);
    console.log("req11", req.body);

    const newRegisterEvent = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      aboutEvent: req.body.aboutEvent,
    });

    const result = await newRegisterEvent.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


const viewRegisterEvent = async (req, res) => {
  try {
    // Optional: Add pagination or filtering logic if needed
    const records = await Register.find({});
    res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewOneRegisterEvent = async (req, res) => {
  try {
    // Retrieve the latest event by sorting in descending order and limiting to 1 record
    const latestEventRegister = await Register.findById(req.params.id);

    if (!latestEventRegister) {
      return res.status(404).json({ error: "registeration not found"})
    }

    res.json(latestEventRegister);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRegisterEvent,
  viewOneRegisterEvent,
  viewRegisterEvent,
};
