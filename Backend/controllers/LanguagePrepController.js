const LanguagePrepModel = require('../models/LanguagePrepModel');
const packageModel = require("../models/PackageModel")

const createRecord = async (req, res) => {
  try {
    const { name, age, email, phone, gender } = req.body;

    const newRecord = new LanguagePrepModel({
      name,
      age,
      email,
      phone,
      gender
    });

    const result = await newRecord.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewRecords = async (req, res) => {
    try {
      const records = await LanguagePrepModel.find({}).sort({ _id: -1 }); // Descending order
      res.status(200).json(records);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const viewPackages = async (req, res) => {
    try {
      const records = await packageModel.find({}) // Descending order
      res.status(200).json(records);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const nodemailer = require('nodemailer');

  const sendEmail = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the record by ID
      const record = await LanguagePrepModel.findById(id);
      console.log("record",record)
      if (!record) {
        return res.status(404).send("Record not found!");
      }
  
      // Create transporter for Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other email services
        auth: {
          user: 'globalreachexperts12@gmail.com', // Use environment variables for security
          pass: 'hpby vjdz xrqm deyn'
        }
      });
  
      // Email options
      const mailOptions = {
        from:"globalreachexperts12@gmail.com",
        to: record.email,
        subject: 'Studetn Language Evalution',
        text: `Hi, ${record.name} ,

         Please fill out the Google Form using the following link:    

         https://docs.google.com/forms/d/14mFxSP5Jo-TDaABUsHZCX7XXuvONYP_rEyJU2jEurtA/edit
             
         Thank You !
              `
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully.");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const deletePackage = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the package by ID and delete it
      const deletedPackage = await packageModel.findByIdAndDelete(id);
  
      if (!deletedPackage) {
        return res.status(404).send("Package not found!");
      }
  
      res.status(200).send("Package deleted successfully.");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const viewOnePackage = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the package by ID
      const package = await packageModel.findById(id);
  
      if (!package) {
        return res.status(404).send("Package not found!");
      }
  
      res.status(200).json(package);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  
  const updatePackage = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Find the package by ID and update it with new data
      const updatedPackage = await packageModel.findByIdAndUpdate(id, updateData, {
        new: true, // Returns the updated document
        runValidators: true, // Validates the data before updating
      });
  
      if (!updatedPackage) {
        return res.status(404).send("Package not found!");
      }
  
      res.status(200).json(updatedPackage);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  

  module.exports = {
    createRecord,
    viewRecords,
    sendEmail,
    viewPackages,
    updatePackage,
    viewOnePackage,
    deletePackage
    
  };
  