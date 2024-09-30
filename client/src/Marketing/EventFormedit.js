import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Tag,
} from "antd";
import australiaFlag from "../Images/ausFlag.png";
import newZealandFlag from "../Images/nzFlag.png";
import canadaFlag from "../Images/canFlag.png";
import ukFlag from "../Images/ukFlag.png";
import irelandFlag from "../Images/irlFlag.png";
import usFlag from "../Images/usaFlag.png";
import PageTitle from "../Components/PageTitle";
import moment from "moment"; // Import moment.js if you need to use it

const { TextArea } = Input;

const countries = [
  { label: "Australia", value: "Australia", flag: australiaFlag },
  { label: "New Zealand", value: "New Zealand", flag: newZealandFlag },
  { label: "Canada", value: "Canada", flag: canadaFlag },
  { label: "United Kingdom", value: "United Kingdom", flag: ukFlag },
  { label: "Ireland", value: "Ireland", flag: irelandFlag },
  { label: "United States", value: "United States", flag: usFlag },
];

const EditEventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const record = queryParams.get("id");
  console.log("record", record);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [institutions, setinstitutions] = useState([]);
  const [institutionsUrl, setInstitutionsUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    viewEvents();
  }, []);

  const viewEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/event/viewOneEventEdit/${record}`
      );
      const eventData = response.data;
      console.log("eventData", eventData);

      setCoverImageUrl(eventData.coverImage); // Set existing cover image URL
      setInstitutionsUrl(eventData.institutions); // Set existing institutions image URL

      const studyLevels = eventData.studyLevel
        ? eventData.studyLevel.split(", ")
        : [];
      const countriesSelected = eventData.country
        ? eventData.country.split(", ")
        : [];

      // Set institutions directly as an array
      const institutionsArray = eventData.institutions
        ? eventData.institutions
        : [];

      form.setFieldsValue({
        eventType: eventData.eventType,
        eventName: eventData.eventName,
        eventDate: eventData.eventDate ? moment(eventData.eventDate) : null,
        eventTime: eventData.eventTime,
        location: eventData.location,
        studyLevel: studyLevels,
        country: countriesSelected,
        description: eventData.discription,
      });
       setinstitutions(institutionsArray);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected cover image:", file);
    if (file) {
      setCoverImage(file);
      setCoverImageUrl(URL.createObjectURL(file)); // Create a preview URL for the cover image
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveName = (institutions) => {
    setinstitutions(institutions.filter((n) => n !== institutions));
  };

  const handleAddInstituions = (e) => {
    e.preventDefault();
    if (inputValue && !institutions.includes(inputValue)) {
      setinstitutions([...institutions, inputValue]);
      setInputValue(""); // Clear input after adding the name
    }
  };

  const handleSave = async (values) => {
    console.log("values", values);
    let studyLevel = values.studyLevel.join(", ");
    let countriesSelected = values.country.join(", ");
    try {
      const formattedValues = {
        ...values,
        eventDate: values.eventDate ? values.eventDate.toISOString() : null,
        studyLevel,
      };
      const response = await axios.put(
        `http://localhost:5000/event/editEvent/${record}`,
        formattedValues
      );
      console.log("Update response:", response.data);
      navigate("/eventMain"); // Redirect after update
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleCancel = () => {
    navigate("/eventMain");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/event/removeEvent/${record}`);
      navigate("/eventMain"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <PageTitle title="Edit Event" />

      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSave}
          style={{
            background: "#f5f5f5",
            padding: "40px",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          {/* Form Fields */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <Form.Item
              label={<b>Event Type</b>}
              name="eventType"
              style={{ flex: "1 1 30%", height: "64px" }}
              rules={[
                { required: true, message: "Please select an event type!" },
              ]}
            >
              <Select
                placeholder="Select Options"
                style={{ width: "100%", height: "100%" }}
              >
                <Select.Option value="Virtual">Virtual</Select.Option>
                <Select.Option value="Physical">Physical</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<b>Event Name</b>}
              name="eventName"
              style={{ flex: "1 1 30%", height: "64px" }}
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
                style={{ height: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={<b>Event Date</b>}
              name="eventDate"
              style={{ flex: "1 1 30%", height: "64px" }}
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker
                style={{ width: "100%", height: "100%" }}
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </div>

          {/* Other Fields */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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
              label={<b>Location</b>}
              name="location"
              style={{ flex: "1 1 30%", height: "64px" }}
              rules={[
                { required: true, message: "Please enter the location!" },
              ]}
            >
              <Input placeholder="Enter location" style={{ height: "100%" }} />
            </Form.Item>

            <Form.Item
              label={<b>Study Level</b>}
              name="studyLevel"
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
              <Checkbox.Group
                options={[
                  { label: "Undergraduate", value: "Undergraduate" },
                  { label: "Postgraduate", value: "Postgraduate" },
                  { label: "Doctorate", value: "Doctorate" },
                  { label: "Diploma", value: "Diploma" },
                ]}
              />
            </Form.Item>
          </div>

          {/* Description */}
          <Form.Item
            label={<b>Description</b>}
            name="description"
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
            <TextArea placeholder="Enter the description" rows={4} />
          </Form.Item>

          {/* File Upload Fields */}
          <div
            style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
          >
            <Form.Item
              name="country"
              label={<b style={{ fontSize: "18px" }}>Country</b>}
              style={{ flex: "1 1 30%" }}
              rules={[
                {
                  required: true,
                  message: "Please select at least one country!",
                },
              ]}
            >
              <Checkbox.Group>
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
              </Checkbox.Group>
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
                onChange={handleCoverImageChange}
                style={{ width: "100%" }}
              />
              {coverImageUrl && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={coverImageUrl}
                    alt="Cover Preview"
                    style={{ width: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
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
                {institutions.map((institution, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveName(institution)}
                    style={{ marginBottom: "8px" }}
                  >
                    {institution}
                  </Tag>
                ))}
              </div>
            </Form.Item>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                style={{ marginRight: "10px" }}
              >
                Update
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
                Delete
              </Button>
            </div>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditEventForm;
