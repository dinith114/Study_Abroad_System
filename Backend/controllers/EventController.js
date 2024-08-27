const Event = require("../models/EventModel");

const createEvent = async (req, res) => {
  try {
    console.log("req", req.files);
    console.log("req11", req.body);

    const newEvent = new Event({
      eventType: req.body.eventType,
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      location: req.body.location,
      studyLevel: req.body.studyLevel,
      discription: req.body.discription,
      country: req.body.country,
      coverImage: "",
      institutions: "",
    });

    const file1 = req.files.coverImage;
    const attch_url = uploadFile(file1);
    newEvent.coverImage = attch_url;

    const file2 = req.files.institutions;
    const attch_url2 = uploadFile(file2);
    newEvent.institutions = attch_url2;

    const result = await newEvent.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const uploadFile = (file) => {
  const file_name = file.name;
  file.mv(`attachFile/` + file_name);
  const url = `http://localhost:5000/` + file_name;
  return url;
};

const viewEvent = async (req, res) => {
  try {
    // Optional: Add pagination or filtering logic if needed
    const records = await Event.find({});
    res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewOneEvent = async (req, res) => {
  
  try {
    // Retrieve the latest event by sorting in descending order and limiting to 1 record
    const latestEvent = await Event.findById(req.params.id);
    console.log("latestEvent", latestEvent);

    if (!latestEvent) {
      return res.status(404).json({ error: "event not found" });
    }

    res.json(latestEvent);
  } catch (err) {
   console.log(err)
  }
};

const viewOneEventEdit = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from the request parameters
    const record = await Event.findById(id); // Find the event by its id
    if (!record) {
      return res.status(404).send("Event not found"); // Handle case where no event is found
    }
    res.status(200).json(record); // Respond with the found event
  } catch (err) {
    console.error(err); // Use console.error for logging errors
    res.status(500).send("Internal Server Error"); // Send error status
  }
};


const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      eventType: req.body.eventType,
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      location: req.body.location,
      studyLevel: req.body.studyLevel,
      discription: req.body.discription,
      country: req.body.country,
      coverImage: req.body.coverImage,
      institutions: req.body.institutions,
    };

    // Check if a new file is being uploaded
    if (req.files && req.files.coverImage) {
      const file = req.files.coverImage;
      const attch_url = uploadFile(file);
      updatedData.coverImage = attch_url;
    }

    if (req.files && req.files.institutions) {
      const file2 = req.files.institutions;
      const attch_url2 = uploadFile(file2);
      updatedData.institutions = attch_url2;
    }

    const result = await Event.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Event not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const removeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.findByIdAndDelete(id);
    if (result) {
      res.status(200).send("Event removed successfully");
    } else {
      res.status(404).send("Event not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createEvent,
  viewEvent,
  editEvent,
  removeEvent,
  viewOneEvent,
  viewOneEventEdit,
};
