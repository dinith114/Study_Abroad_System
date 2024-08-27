const express = require("express");
const app = express.Router();
const EventController = require("../controllers/EventController");

app.post("/createEvent", EventController.createEvent);
app.get("/viewEvent", EventController.viewEvent);

app.get("/viewOneEvent/:id", EventController.viewOneEvent);

app.put("/editEvent/:id", EventController.editEvent);

app.delete("/removeEvent/:id", EventController.removeEvent);

app.get("/viewOneEventEdit/:id", EventController.viewOneEventEdit);



module.exports = app;
