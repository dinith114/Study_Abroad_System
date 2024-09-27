const Feedback = require('../models/FeedbackModel');

const createFeedback = async (req, res) => {
    // console.log("req",req)
  try {
    const { name, surname, email, description } = req.body;

    const newFeedback = new Feedback({
      name,
      surname,
      email,
      description
    });

    const result = await newFeedback.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewUserFeedbacks = async (req, res) => {
    try {
      const { email } = req.params;
  
      const feedbacks = await Feedback.find({ email }).sort({ createdAt: -1 });
      res.status(200).json(feedbacks);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const replyToFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      const { adminReply } = req.body;
  
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, { adminReply }, { new: true });
  
      if (updatedFeedback) {
        res.status(200).send(updatedFeedback);
      } else {
        res.status(404).send("Feedback not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  

  const viewAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
      res.status(200).json(feedbacks);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedFeedback = await Feedback.findByIdAndDelete(id);
      if (deletedFeedback) {
        res.status(200).send("Feedback deleted successfully.");
      } else {
        res.status(404).send("Feedback not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const editFeedback = async (req, res) => {
    // console.log("req",res)
    try {
      const { id } = req.params;
      const { name, surname, email, description } = req.body;
      console.log("req.body",req.body)
  
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, { name, surname, email, description }, { new: true });
      if (updatedFeedback) {
        res.status(200).send(updatedFeedback);
      } else {
        res.status(404).send("Feedback not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  const viewOneFeedback = async (req, res) => {
    try {
      const { id } = req.params;
  
      const feedback = await Feedback.findById(id);
      if (feedback) {
        res.status(200).json(feedback);
      } else {
        res.status(404).send("Feedback not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports = {
    createFeedback,
    viewUserFeedbacks,
    replyToFeedback,
    viewAllFeedbacks,
    editFeedback,
    deleteFeedback,
    viewOneFeedback // Added export for the new function
  };