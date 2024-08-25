import React from "react";
import { Card, Tag, Form, Input, Button, Select } from "antd";
import Eventpic1 from "../Images/event1.jpg"; // Update this to match the banner image in your screenshot
// import Logo1 from "../Images/logo1.png"; // Update these to match the logos in your screenshot
// import Logo2 from "../Images/logo2.png";

const EventRegister = () => {
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
            src={Eventpic1} // Update this to your banner image
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
            Physical
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
            Australia Education
            <br />
            Exhibition
          </h1>
        </div>

        {/* Event Details Card */}
        <Card
          title={
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
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
              13th Sep 2024, 10:30 AM - 2:00 PM
            </p>
            <p style={{ fontSize: "16px", margin: "10px 0 0" }}>Location</p>
            <p style={{ color: "#1890ff", fontSize: "16px", margin: "0" }}>
              Cinnamon Grand Colombo
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Featured study levels
            </h3>
            <Tag color="blue" style={{ margin: "0 5px" }}>
              Undergraduate
            </Tag>
            <Tag color="blue" style={{ margin: "0 5px" }}>
              Postgraduate
            </Tag>
            <Tag color="blue" style={{ margin: "0 5px" }}>
              Doctorate
            </Tag>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              About this event
            </h3>
            <p style={{ fontSize: "16px", margin: "0" }}>
              Join us on September 13th for an exciting opportunity to explore
              study options in Australia.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Participating institutions
            </h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {/* <img
                src={Logo1} // Update this to your institution logo 1
                alt="Institution 1"
                style={{ width: "60px", borderRadius: "5px" }}
              />
              <img
                src={Logo2} // Update this to your institution logo 2
                alt="Institution 2"
                style={{ width: "60px", borderRadius: "5px" }}
              /> */}
              {/* Add more logos as needed */}
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
            style={{ flex: "1", display: "flex", flexDirection: "column" }}
          >
            <Form.Item label="First name" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item label="Last name" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item label="Age" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter your age" />
            </Form.Item>
            <Form.Item
              label="Your City of Residence"
              style={{ marginBottom: "15px" }}
            >
              <Input placeholder="Enter your city of residence" />
            </Form.Item>
            <Form.Item label="Email" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Mobile number" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter your mobile number" addonBefore="+94" />
            </Form.Item>
            <Form.Item
              label="How did you hear about this event?"
              style={{ marginBottom: "15px" }}
            >
              <Select placeholder="Select an option">
                <Select.Option value="social_media">Social Media</Select.Option>
                <Select.Option value="friend">Friend</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Captcha" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter the captcha" />
            </Form.Item>
            <Form.Item style={{ marginTop: "auto" }}>
              <Button type="primary" block style={{ height: "40px" }}>
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
