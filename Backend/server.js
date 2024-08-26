const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const loanApplicationsRouter = require('./routes/loanApplications');
const fileUpload = require('express-fileupload');
const bankRoutes = require('./routes/bankRoutes');
const path = require('path'); // Import the path module
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Pasan image upload
app.use(fileUpload()); // Add express-fileupload middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// connect to mongoDB
//mongoose.connect("mongodb://localhost/mern-stack-db");
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log(err)
})

// define routes and middleware

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

console.log("hi");
console.log("hi");

app.use('/loan-applications', loanApplicationsRouter);

app.use('/banks', bankRoutes);