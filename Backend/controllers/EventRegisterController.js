const EventRegister = require("../models/EventRegisterModel");
const Register = require("../models/EventRegisterModel");
const nodemailer =  require("nodemailer")

const createRegisterEvent = async (req, res) => {
  try {
    console.log("req", req.files);
    console.log("req11", req.body);

    const newRegisterEvent = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      aboutEvent: req.body.aboutEvent,
      eventName:req.body.eventName
    });

    const result = await newRegisterEvent.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const assignCounselor = async(req,res)=>{
  try{
   const { id,counselor } = req.params;
  console.log("req.params",req.params)
      const updatedData = {
        counselor: counselor,
      };
     const result = await Register.findByIdAndUpdate(id, updatedData, {
       new: true,
     });
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Event not found!");
      }

  }catch(err){

  }
}

const verification =async(req,res)=>{
 try{
   const { id } = req.params;
   const updateData ={
     status:"Verified"
   }
    const result = await Register.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Event not found!");
    }

 }catch(err){

 }
}

const viewRegisterEvent = async (req, res) => {
  try {
    // Optional: Add pagination or filtering logic if needed
    const records = await Register.find({});
    res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewOneRegisterEvent = async (req, res) => {
  try {
    // Retrieve the latest event by sorting in descending order and limiting to 1 record
    const latestEventRegister = await Register.findById(req.params.id);

    if (!latestEventRegister) {
      return res.status(404).json({ error: "registeration not found"})
    }

    res.json(latestEventRegister);
  } catch (err) {
    next(err);
  }
};



// Send email
const sendEmail = async (req, res) => {
  try {
    const { email, appointmentDate, appointmentTime, name } = req.params;

    console.log("req.params", req.params);

    // Create transporter for Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "globalreachexperts12@gmail.com",
        pass: "hpby vjdz xrqm deyn",
      },
    });

    // Email options with styled HTML
    const mailOptions = {
      from: "globalreachexperts12@gmail.com",
      to: email,
      subject: "Global Reach Education Fair",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="text-align: center; color: #1a73e8;">Global Reach Education Fair</h2>
        <p>Hi, <strong>${name}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6;">
          Learn about the availability of scholarships, and get information on course options, fee structures, along with education loan assistance.
        </p>
        <p style="font-size: 14px; line-height: 1.6;">
          Please visit our office at the scheduled time:
        </p>
        <div style="background-color: #f1f3f4; padding: 10px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${appointmentDate}</p>
          <p><strong>Time:</strong> ${appointmentTime}</p>
        </div>
        <p style="font-size: 14px; line-height: 1.6;">We look forward to seeing you!</p>
        <p style="font-size: 14px; color: #1a73e8;">Thank You!</p>
        <footer style="text-align: center; margin-top: 30px;">
          <p style="font-size: 12px; color: #777;">Global Reach Experts</p>
          <p style="font-size: 12px; color: #777;">1234 Education Lane, Colombo, Sri Lanka</p>
        </footer>
      </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  createRegisterEvent,
  viewOneRegisterEvent,
  viewRegisterEvent,
  sendEmail,
  assignCounselor,
  verification
};
