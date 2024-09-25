const express = require("express");
const app = express.Router();
const StudentApplicationController = require("../controllers/StudentApplicationController");

app.post("/createStudentApplication", StudentApplicationController.createStudentApplication);
app.get("/viewStudentApplication", StudentApplicationController.viewStudentApplication);

app.get("/viewOneStudentApplication/:id", StudentApplicationController.viewOneStudentApplication);

app.put("/editStudentApplication/:id", StudentApplicationController.editStudentApplication);

app.delete("/removeStudentApplication/:id", StudentApplicationController.removeStudentApplication);

app.get("/viewOneStudentApplicationEdit/:id", StudentApplicationController.viewOneStudentApplicationEdit);

// Define the PUT route to update the student's status
// app.put("/updateStudentStatus/:id", studentController.updateStudentStatus);
module.exports = app;   