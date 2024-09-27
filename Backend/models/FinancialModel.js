const mongoose  = require('mongoose')

const FinancialModel = new mongoose.Schema({

    date:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
        
    },
    description:{
        type:String,
        required:true
        
    },


})

module.exports = mongoose.model("FinancialModel",FinancialModel);