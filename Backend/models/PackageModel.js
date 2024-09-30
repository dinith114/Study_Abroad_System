const mongoose  = require('mongoose')

const PackageModel = new mongoose.Schema({

    packageName:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
        
    },
   

})

module.exports = mongoose.model("PackageModel",PackageModel);