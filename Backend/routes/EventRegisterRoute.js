const express = require("express");
const app = express.Router();
const EventController = require("../controllers/EventRegisterController");

app.post("/createRegisterEvent", EventController.createRegisterEvent);
app.get("/viewRegisterEvent", EventController.viewRegisterEvent);
app.get("/viewOneRegisterEvent/:id", EventController.viewOneRegisterEvent);


module.exports = app;
