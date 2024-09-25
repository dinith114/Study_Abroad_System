  /*const StudentApplicationModel = require("../models/StudentApplicationModel");*/
  const StudentApplication = require("../models/StudentApplicationModel")
  const path = require('path');

  // Custom function to generate studentID
  // const generateStudentID = async () => {
  //   const count = await StudentApplication.countDocuments(); // Get total number of student applications
  //   const timestamp = Date.now(); // Current timestamp
  //   return `STU-${timestamp}-${count + 1}`; // Example: STU-1634567890000-10
  // };

  //Create
  const createStudentApplication = async (req, res) => {
    
      try {
          console.log("req", req);
          console.log("req11", req.body);

        //    // Generate the unique studentID using custom logic
        // const studentId = await generateStudentID();

    /* const { studentId, studentFullName, studentFirstName, studentLastName, studentDob, age, nic, gender, email, phoneNumber,
          address, profileImage, currentlyCompleted, otherQualifications, ieltsStatus, incomeLevel, financeSType, preferCourse,
          preferCountry, preferUniversity
      } = req.body;*/
      //const registrationNo = await generateRegistrationNo();

      const newStudentApplication = new StudentApplication({
          // studentID, // Add the generated studentID
          studentFullName: req.body.studentFullName,
          studentFirstName: req.body.studentFirstName,
          studentLastName: req.body.studentLastName,
          studentDob: req.body.studentDob,
          age: req.body.age,
          nic: req.body.nic,
          gender: req.body.gender,
          email: req.body.email,  
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          profileImage: "",
          currentlyCompleted: req.body.currentlyCompleted,
          otherQualifications: req.body.otherQualifications,
          ieltsStatus: req.body.ieltsStatus,
          incomeLevel: req.body.incomeLevel,
          financeSType: req.body.financeSType,
          preferCourse: req.body.preferCourse,
          preferCountry: req.body.preferCountry,
          preferUniversity: req.body.preferUniversity,
          //registrationNo, // Set the registration number
      });

      const file1 = req.files.profileImage;
      const attch_url = uploadFile(file1);
      newStudentApplication.profileImage = attch_url;

      const result = await newStudentApplication.save();
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };

  /* const uploadFile = (file) => {
      const file_name = file.name;
      file.mv(`attachFile/` + file_name);
      const url = `http://localhost:5000/` + file_name;
      return url;
    }; */

    //chatgpt new
    const uploadFile = (file) => {
      const file_name = file.name;
      const uploadPath = path.join(__dirname, '..', 'attachFile', file_name);
      file.mv(uploadPath, (err) => {
          if (err) {
              console.error("File upload failed:", err);
          }
      });
      const url = `http://localhost:5000/${file_name}`;
      return url;
  };

    //View
    const viewStudentApplication = async (req, res) => {
      try {
        // Optional: Add pagination or filtering logic if needed
        const records = await StudentApplication.find({});
        res.status(200).json(records);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    };

    const viewOneStudentApplication= async (req, res) => {
      try {
        // Retrieve the latest event by sorting in descending order and limiting to 1 record
        const latestStudent = await StudentApplication.find({}).sort({ createdAt: -1 }).limit(1);
    
        if (latestStudent.length === 0) {
          return res.status(404).send("No student found");
        }
    
        res.status(200).json(latestStudent[0]);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    };
    
    const viewOneStudentApplicationEdit = async (req, res) => {
      try {
        const { id } = req.params; // Extract id from the request parameters
        const record = await StudentApplication.findById(id); // Find the event by its id
        if (!record) {
          return res.status(404).send("Student not found"); // Handle case where no event is found
        }
        res.status(200).json(record); // Respond with the found event
      } catch (err) {
        console.error(err); // Use console.error for logging errors
        res.status(500).send("Internal Server Error"); // Send error status
      }
    };
    

    //Edit
    const editStudentApplication = async (req, res) => {
      try {
        const { id } = req.params;
        console.log("id",id)
        console.log("ssss555",req.body)

        const updatedData = {
          studentFullName: req.body.studentFullName,
          studentFirstName: req.body.studentFirstName,
          studentLastName: req.body.studentLastName,
          studentDob: req.body.studentDob,
          age: req.body.age,
          nic: req.body.nic,
          gender: req.body.gender,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          profileImage: req.body.profileImage,
          currentlyCompleted: req.body.currentlyCompleted,
          otherQualifications: req.body.otherQualifications,
          ieltsStatus: req.body.ieltsStatus,
          incomeLevel: req.body.incomeLevel,
          financeSType: req.body.financeSType,
          preferCourse: req.body.preferCourse,
          preferCountry: req.body.preferCountry,
          preferUniversity: req.body.preferUniversity,
        };
        
      console.log("updatedDate",updatedData)
        // Check if a new file is being uploaded
      if (req.files && req.files.profileImage) {
          const file1 = req.files.profileImage;
          const attch_url = uploadFile(file1);
          updatedData.profileImage = attch_url;
        }
      
      const result = await StudentApplication.findByIdAndUpdate(id, updatedData, {
          new: true,
      });

      if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send("Image not found!");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    };

    //Delete
    const removeStudentApplication = async (req, res) => {
      try {
        const { id } = req.params;
        const result = await StudentApplication.findByIdAndDelete(id);
        if (result) {
          res.status(200).send("Student details removed successfully");
        } else {
          res.status(404).send("Student not found!");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    };

    // New: Update Student Status
// const updateStudentStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     const updatedStudent = await StudentApplication.findByIdAndUpdate(id, { status }, { new: true });
//     if (updatedStudent) {
//       res.status(200).json({ message: 'Status updated successfully', updatedStudent });
//     } else {
//       res.status(404).json({ message: 'Student not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update status', error });
//   }
// };
    
    module.exports = {
      createStudentApplication,
      viewStudentApplication,
      editStudentApplication,
      removeStudentApplication,
      viewOneStudentApplication,
      viewOneStudentApplicationEdit,
      // updateStudentStatus, // Export the update status function

    };
    
    