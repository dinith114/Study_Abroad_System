const express = require("express");
const app = express.Router();
const StudentApplicationController = require("../controllers/StudentApplicationController");

app.post("/createStudentApplication", StudentApplicationController.createStudentApplication);
app.get("/viewStudentApplication", StudentApplicationController.viewStudentApplication);

app.get("/viewOneStudentApplication/:id", StudentApplicationController.viewOneStudentApplication);

app.put("/editStudentApplication/:id", StudentApplicationController.editStudentApplication);

app.delete("/removeStudentApplication/:id", StudentApplicationController.removeStudentApplication);

app.get("/viewOneStudentApplicationEdit/:id", StudentApplicationController.viewOneStudentApplicationEdit);

// // New route: Update the status of a student application by ID
 //app.put("/updateStudentStatus/:id", StudentApplicationController.updatestudentStatus);
// app.post("/createStatus", StudentApplicationController.createStatus);

app.post("/sendEmail/:id", StudentApplicationController.sendEmail);

module.exports = app;