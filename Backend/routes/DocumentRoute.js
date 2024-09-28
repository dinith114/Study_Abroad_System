const express = require("express");
const app = express.Router();
const documentController = require('../controllers/DocumentController');

//:POST method
app.post('/documentCreate',documentController.creatDocuments);

// Edit Document
app.put('/documents/:id', documentController.editDocument);

// Remove Document
app.delete('/removeDocuments/:id', documentController.removeDocument);

// View Document
app.get('/viewdocuments', documentController.viewDocuments);

app.get('/viewOnedocuments/:id', documentController.viewDocumentById);

module.exports = app;