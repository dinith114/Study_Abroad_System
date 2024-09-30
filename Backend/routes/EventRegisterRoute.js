const express = require("express");
const app = express.Router();
const EventController = require("../controllers/EventRegisterController");

app.post("/createRegisterEvent", EventController.createRegisterEvent);
app.post(
  "/sendEmail/:email/:appointmentDate/:appointmentTime/:name",
  EventController.sendEmail
);

app.get("/viewRegisterEvent", EventController.viewRegisterEvent);
app.get("/viewOneRegisterEvent/:id", EventController.viewOneRegisterEvent);

app.put("/assignCounselor/:id/:counselor", EventController.assignCounselor);

app.put("/verification/:id", EventController.verification);


module.exports = app;
