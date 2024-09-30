import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, DatePicker, Form, Input, Select, Tag } from "antd";
import australiaFlag from "../Images/ausFlag.png";
import newZealandFlag from "../Images/nzFlag.png";
import canadaFlag from "../Images/canFlag.png";
import ukFlag from "../Images/ukFlag.png";
import irelandFlag from "../Images/irlFlag.png";
import usFlag from "../Images/usaFlag.png";
import PageTitle from "../Components/PageTitle";
import moment from "moment";

const { TextArea } = Input;

const countries = [
  { label: "Australia", value: "Australia", flag: australiaFlag },
  { label: "New Zealand", value: "New Zealand", flag: newZealandFlag },
  { label: "Canada", value: "Canada", flag: canadaFlag },
  { label: "United Kingdom", value: "United Kingdom", flag: ukFlag },
  { label: "Ireland", value: "Ireland", flag: irelandFlag },
  { label: "United States", value: "United States", flag: usFlag },
];

const studyLevels = [
  { label: "Undergraduate", value: "Undergraduate" },
  { label: "Postgraduate", value: "Postgraduate" },
  { label: "Doctorate", value: "Doctorate" },
  { label: "Diploma", value: "Diploma" },
];

function EventForm() {
  const [coverImage, setCoverImage] = useState(null);
  const [institutions, setinstitutions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);
  
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("hii");
    console.log("values", values);
    if (Array.isArray(values.studyLevel)) {
      values.studyLevel = values.studyLevel.join(", "); // Join selected levels as a comma-separated string
    }
    const formData = new FormData();
    // Append normal form fields
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key])); // Convert array to JSON string
      } else {
        formData.append(key, values[key]);
      }
    });

    // Append file for cover picture
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    if(institutions){
        formData.append("institutions", institutions);
    }

    console.log("formData", formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/event/createEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      navigate(`/eventRegister?id=${response.data._id}`); // Redirect after update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

   const handleInputChange = (e) => {
     setInputValue(e.target.value);
   };

   const handleAddInstituions = (e) => {
    e.preventDefault(); 
     if (inputValue && !institutions.includes(inputValue)) {
       setinstitutions([...institutions, inputValue]);
       setInputValue(""); // Clear input after adding the name
     
     }
   };

   const handleRemoveName = (institutions) => {
     setinstitutions(institutions.filter((n) => n !== institutions));
   };

  return (
    <div>
      <PageTitle title="Create a New Event" />
      <div style={{ padding: "40px", maxWidth: "1400px", margin: "auto" }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{
            background: "#f5f5f5",
            padding: "60px",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <Form.Item
              label={<b style={{ fontSize: "18px" }}>Event Type</b>}
              style={{ flex: "1 1 30%", height: "80px" }}
              name="eventType"
              rules={[
                { required: true, message: "Please select an event type!" },
              ]}
            >
              <Select
                placeholder="Select Options"
                style={{ width: "100%", height: "100%", fontSize: "16px" }}
              >
                <Select.Option value="Virtual">Virtual</Select.Option>
                <Select.Option value="Physical">Physical</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={<b style={{ fontSize: "18px" }}>Event Name</b>}
              style={{ flex: "1 1 30%", height: "80px" }}
              name="eventName"
              rules={[
                { required: true, message: "Please enter the event name!" },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: "Event name cannot contain numbers or symbols!",
                },
              ]}
            >
              <Input
                placeholder="Enter event name"
                style={{ height: "100%", fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item
              name="eventDate"
              label={<b style={{ fontSize: "18px" }}>Event Date</b>}
              style={{ flex: "1 1 30%", height: "80px" }}
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker
                style={{ width: "100%", height: "100%", fontSize: "16px" }}
                placeholder="Select date"
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <Form.Item
              label={<b>Time</b>}
              name="eventTime"
              style={{ flex: "1 1 30%", height: "64px" }}
              rules={[
                { required: true, message: "Please enter the event time!" },
                {
                  pattern:
                    /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*[AP]M\s*-\s*(0?[1-9]|1[0-2]):[0-5][0-9]\s*[AP]M$/,
                  message:
                    "Please enter a valid time in the format '9:00 AM - 10:00 AM'.",
                },
              ]}
            >
              <Input
                placeholder="Enter time (e.g., 9:00 AM - 10:00 AM)"
                style={{ height: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="location"
              label={<b style={{ fontSize: "18px" }}>Location</b>}
              style={{ flex: "1 1 30%", height: "80px" }}
              rules={[
                { required: true, message: "Please enter the location!" },
              ]}
            >
              <Input
                placeholder="Enter location"
                style={{ height: "100%", fontSize: "16px" }}
              />
            </Form.Item>
            <Form.Item
              name="studyLevel"
              label={<b style={{ fontSize: "18px" }}>Study Level</b>}
              style={{ flex: "1 1 30%" }}
              rules={[
                {
                  required: true,
                  message: "Please select at least one study level!",
                  validator: (_, value) =>
                    value && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          "Please select at least one study level!"
                        ),
                },
              ]}
            >
              <Checkbox.Group>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {studyLevels.map((level) => (
                    <Checkbox
                      key={level.value}
                      value={level.value}
                      style={{ fontSize: "16px" }}
                    >
                      {level.label}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>

          <Form.Item
            name="discription"
            label={<b style={{ fontSize: "18px" }}>Description</b>}
            rules={[
              { required: true, message: "Please enter a description!" },
              {
                min: 10,
                message: "Description must be at least 10 characters long!",
              },
              {
                max: 500,
                message: "Description cannot be more than 500 characters long!",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the description"
              rows={4}
              style={{ fontSize: "16px" }}
            />
          </Form.Item>

          <div
            style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}
          >
            <Form.Item
              name="country"
              label={<b style={{ fontSize: "18px" }}>Country</b>}
              style={{ flex: "1 1 30%" }}
              rules={[
                {
                  required: true,
                  message: "Please select at least one country!",
                  validator: (_, value) =>
                    value && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject("Please select at least one country!"),
                },
              ]}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {countries.map((country) => (
                  <Checkbox
                    key={country.value}
                    value={country.value}
                    style={{ flex: "1 1 30%", fontSize: "16px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={country.flag}
                        alt={country.label}
                        style={{ width: "24px", marginRight: "8px" }}
                      />
                      {country.label}
                    </div>
                  </Checkbox>
                ))}
              </div>
            </Form.Item>
            <Form.Item
              name="coverImage"
              label={<b style={{ fontSize: "18px" }}>Cover Picture</b>}
              style={{ flex: "1 1 30%" }}
              rules={[
                {
                  required: true,
                  message: "Please upload a cover picture!",
                },
                {
                  validator: (_, value) => {
                    if (!value || !value.file) {
                      return Promise.resolve(); // If no file is selected, no need to validate further
                    }
                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                    ];
                    if (allowedTypes.includes(value.file.type)) {
                      return Promise.resolve(); // Valid file type
                    }
                    return Promise.reject(
                      "Only image files (JPG, PNG, GIF) are allowed!"
                    );
                  },
                },
              ]}
            >
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                // onChange={(e) => setCoverImage(e.target.files[0])}
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("Selected file:", e.target); // Log the selected file
                  setCoverImage(file); // Update the state with the selected file
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Institutions">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onPressEnter={handleAddInstituions}
                suffix={<PlusOutlined onClick={handleAddInstituions} />}
                style={{ marginBottom: "12px", width: "100%" }}
              />
              <div>
                {institutions.map((institutions, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveName(institutions)}
                    style={{ marginBottom: "8px" }}
                  >
                    {institutions}
                  </Tag>
                ))}
              </div>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "18px", padding: "12px" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EventForm;
