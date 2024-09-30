const mongoose  = require('mongoose')

const DocumentModel = new mongoose.Schema({

    studentName:{
        type:String,
        required:true
    },
    documentType:{
        type:String,
        required:true
    },
    attachments:{
        type:String,
        required:true
        
    },
    createdDate: {
        type: Date,
        default: Date.now // Automatically set to the current date and time
      }


})

module.exports = mongoose.model("DocumentModel",DocumentModel);