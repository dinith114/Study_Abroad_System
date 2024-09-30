const mongoose  = require('mongoose')

const FeedbackModel = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        
    },
    description:{
        type:String,
        required:true
        
    },
    adminReply: {
        type: String,
        default: ''
      },
    createdAt: {
        type: Date,
        default: Date.now
      }


})

module.exports = mongoose.model("FeedbackModel",FeedbackModel);