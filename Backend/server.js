const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const loanApplicationsRouter = require('./routes/loanApplications');
const languagePrepRequest = require('./routes/LanguagePrepRoute');
const fileUpload = require('express-fileupload');
const bankRoutes = require('./routes/bankRoutes');
const path = require('path'); // Import the path module
const bodyParser = require("body-parser");


// const fileuplaod = require("express-fileupload");
// const upload = require('./middlewares/upload');
const financialRouter = require('../Backend/routes/FinancialRoute');

const documentRoute = require('../Backend/routes/DocumentRoute')

const fileuplaod = require("express-fileupload");
// const cors = require('cors');
// const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(fileuplaod({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/attachFile"));
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Pasan image upload
app.use(fileUpload()); // Add express-fileupload middleware
// // Create a new bank with file upload
// router.post('/add', upload.single('bankIcon'), bankController.createBank);

// connect to mongoDB
//mongoose.connect("mongodb://localhost/mern-stack-db");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// define routes and middleware

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// const todoSchema = new mongoose.Schema({
//   task: String,
//   completed: Boolean,
// });

// app.use(cors());

console.log("hi");
console.log("hi");
const EventRouter = require("../Backend/routes/EventRoute");
const EventRegisterRouter = require("../Backend/routes/EventRegisterRoute");

app.use("/event", EventRouter);
app.use("/eventRegister", EventRegisterRouter);
app.use('/document',documentRoute)

app.use('/loan-applications', loanApplicationsRouter);
app.use('/financial',financialRouter);

app.use('/languagePrep',languagePrepRequest);
app.use('/banks', bankRoutes);
// const loanApplicationsRouter = require("./routes/loanApplications");
// const EventRouter = require("../Backend/routes/EventRoute");
// const EventRegisterRouter = require("../Backend/routes/EventRegisterRoute");
const PartnershipRoute = require("./routes/PartnershipRouter");
const CourseRoute = require("./routes/CourseRouter");


app.use("/course", CourseRoute);
app.use("/partnership", PartnershipRoute);
// app.use("/loan-applications", loanApplicationsRouter);
// app.use("/event", EventRouter);
// app.use("/eventRegister", EventRegisterRouter);

// app.use('/loan-applications', loanApplicationsRouter);

// app.use('/banks', bankRoutes);
