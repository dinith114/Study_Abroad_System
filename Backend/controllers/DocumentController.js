const DocumentModel = require("../models/DocumentModel");

const creatDocuments = async (req, res) => {
  try {
   const newRequest = new DocumentModel({
     
    studentName : req.body.studentName,
    documentType:req.body.documentType,
    attachments :""
    

   })
    
    const file1 = req.files.attachments;
    const attch_url = uploadFile(file1);
    newRequest.attachments = attch_url;
 

    const result = await DocumentModel.create(newRequest);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(500).send("Something went wrong !");
    }
  } catch (err) {
    console.log(err);
  }
};

const uploadFile =(file)=>{
  const file_name = file.name;
  file.mv(`attachFile/`+file_name)
  const url = `http://localhost:5000/`+file_name;
  return url;

}

const editDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = {
        studentName: req.body.studentName,
        documentType: req.body.documentType,
        attachments: req.body.attachments, // Assuming attachments can be updated
      };
  
      // Check if a new file is being uploaded
      if (req.files && req.files.attachments) {
        const file = req.files.attachments;
        const attch_url = uploadFile(file);
        updatedData.attachments = attch_url;
      }
  
      const result = await DocumentModel.findByIdAndUpdate(id, updatedData, { new: true });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Document not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const removeDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await DocumentModel.findByIdAndDelete(id);
      if (result) {
        res.status(200).send("Document removed successfully");
      } else {
        res.status(404).send("Document not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const viewDocumentById= async (req, res) => {
    try {
      const { id } = req.params;
      const document = await DocumentModel.findById(id);
      if (document) {
        res.status(200).send(document);
      } else {
        res.status(404).send("Document not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  const viewDocuments = async (req, res) => {
    try {
        // Optional: Add pagination or filtering logic if needed
        const records = await DocumentModel.find({});
        res.status(200).json(records);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
  };


 
module.exports = {
  creatDocuments,
  editDocument,
  removeDocument,
  viewDocuments,
  viewDocumentById

};