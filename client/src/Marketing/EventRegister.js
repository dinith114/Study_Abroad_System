import React,{useEffect,useState} from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Tag, Form, Input, Button, Select } from "antd";
import Eventpic1 from "../Images/event1.jpg"; // Update this to match the banner image in your screenshot
// import Logo1 from "../Images/logo1.png"; // Update these to match the logos in your screenshot
// import Logo2 from "../Images/logo2.png";

const EventRegister = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Parse the query parameters
  const id = queryParams.get("id");

  const [eventlist,setEventList] = useState([]);

useEffect(()=>{
  viewEvents();
},[])

const viewEvents=async()=>{
  let response = await axios.get(
    `http://localhost:5000/event/viewOneEvent/${id}`
  );
  console.log("response", response.data);
  setEventList(response.data);
  console.log("eventlist.coverImage", eventlist.coverImage);
}


const onFinish = async (values) => {
  console.log("hii");
  console.log("values", values);
  const formData = new FormData();
  // Append normal form fields
  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      formData.append(key, JSON.stringify(values[key])); // Convert array to JSON string
    } else {
      formData.append(key, values[key]);
    }
  });

  console.log("formData", formData);
  try {
    const response = await axios.post(
      "http://localhost:5000/eventRegister/createRegisterEvent",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", response.data);
    navigate(`/participantList?id=${response.data._id}`); // Redirect after update
  } catch (error) {
    console.error("Error updating data:", error);
  }
};




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px",
        maxWidth: "1500px",
        margin: "0 auto",
      }}
    >
      {/* Left section - Event Banner and Details */}
      <div
        style={{
          flex: "1",
          marginRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Event Banner */}
        <div
          className="event-banner-container"
          style={{
            position: "relative",
            width: "100%",
            height: "300px",
            marginBottom: "20px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            alt="Event Banner"
            src={eventlist.coverImage} // Update this to your banner image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Tag for Event Type */}
          <Tag
            color="blue"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            {eventlist.eventType}
          </Tag>

          {/* Title overlay */}
          <h1
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "white",
              fontSize: "36px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {eventlist.eventName}
          </h1>
        </div>

        {/* Event Details Card */}
        <Card
          title={
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
              Event Details
            </span>
          }
          bordered={false}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            backgroundColor: "#f7f9fc",
            padding: "20px",
            flex: "1", // Allow the card to take up remaining space
          }}
          bodyStyle={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Where & When
            </h3>
            <p style={{ fontSize: "16px", margin: "0" }}>Date & time</p>
            <p style={{ color: "#1890ff", fontSize: "16px", margin: "0" }}>
              {eventlist.eventDate}, {eventlist.eventTime}
            </p>
            <p style={{ fontSize: "16px", margin: "10px 0 0" }}>Location</p>
            <p style={{ color: "#1890ff", fontSize: "16px", margin: "0" }}>
              {eventlist.location}
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Featured study levels
            </h3>
            <Tag color="blue" style={{ margin: "0 5px" }}>
              {eventlist.studyLevel}
            </Tag>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              About this event
            </h3>
            <p style={{ fontSize: "16px", margin: "0" }}>
              {eventlist.discription}
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Participating institutions
            </h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {eventlist.institutions}
            </div>
          </div>
        </Card>
      </div>

      {/* Right section - Registration Form */}
      <div
        style={{
          flex: "1",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          title={
            <h2
              style={{ fontSize: "24px", fontWeight: "bold", color: "#001529" }}
            >
              Register for this event
            </h2>
          }
          bordered={false}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            flex: "1", // Allow the card to take up remaining space
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ flex: "1", display: "flex", flexDirection: "column" }}
          >
            <Form.Item
              label="First name"
              name="firstName"
              style={{ marginBottom: "15px" }}
              rules={[
                { required: true, message: "Please enter your first name!" },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "First name cannot contain numbers or symbols!",
                },
              ]}
            >
              <Input placeholder="Enter your first name" name="firstName" />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastName"
              style={{ marginBottom: "15px" }}
              rules={[
                { required: true, message: "Please enter your last name!" },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "Last name cannot contain numbers or symbols!",
                },
              ]}
            >
              <Input placeholder="Enter your last name" name="lastName" />
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              style={{ marginBottom: "15px" }}
              rules={[
                { required: true, message: "Please enter your age!" },
                {
                  type: "number",
                  min: 16,
                  message: "Age must be at least 16!",
                },
              ]}
            >
              <Input placeholder="Enter your age" name="age" />
            </Form.Item>
            <Form.Item
              label="Your City of Residence"
              style={{ marginBottom: "15px" }}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please enter your city of residence!",
                },
              ]}
            >
              <Input
                placeholder="Enter your city of residence"
                name="address"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              style={{ marginBottom: "15px" }}
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" name="email" />
            </Form.Item>
            <Form.Item
              label="Mobile number"
              name="phone"
              style={{ marginBottom: "15px" }}
              rules={[
                { required: true, message: "Please enter your mobile number!" },
                {
                  pattern: /^\d{9}$/,
                  message:
                    "Mobile number must be 9 digits and cannot contain letters!",
                },
              ]}
            >
              <Input
                placeholder="Enter your mobile number"
                addonBefore="+94"
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="How did you hear about this event?"
              style={{ marginBottom: "15px" }}
              name="aboutEvent"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select placeholder="Select an option" name="aboutEvent">
                <Select.Option value="social_media">Social Media</Select.Option>
                <Select.Option value="friend">Friend</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ marginTop: "auto" }}>
              <Button
                type="primary"
                block
                style={{ height: "40px" }}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EventRegister;
