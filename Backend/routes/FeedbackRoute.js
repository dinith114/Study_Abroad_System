const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedbackController');

// Create Feedback
router.post('/feedbacks', feedbackController.createFeedback);

// View User Feedbacks
router.get('/feedbacks/user/:email', feedbackController.viewUserFeedbacks);

// Reply to Feedback (Admin)
router.post('/feedbacks/:id/reply', feedbackController.replyToFeedback);

// View All Feedbacks (Admin)
router.get('/viewfeedbacks', feedbackController.viewAllFeedbacks);

router.get('/feedbacks/:id', feedbackController.viewOneFeedback);

router.delete('/deletefeedbacks/:id', feedbackController.deleteFeedback);

router.put('/editfeedbacks/:id', feedbackController.editFeedback);



module.exports = router;
