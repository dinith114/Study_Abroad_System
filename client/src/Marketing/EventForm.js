import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import australiaFlag from "../Images/ausFlag.png";
import newZealandFlag from "../Images/nzFlag.png";
import canadaFlag from "../Images/canFlag.png";
import ukFlag from "../Images/ukFlag.png";
import irelandFlag from "../Images/irlFlag.png";
import usFlag from "../Images/usaFlag.png";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// Define the country options with corresponding flag images
const countries = [
  { label: "Australia", value: "Australia", flag: australiaFlag },
  { label: "New Zealand", value: "New Zealand", flag: newZealandFlag },
  { label: "Canada", value: "Canada", flag: canadaFlag },
  { label: "United Kingdom", value: "United Kingdom", flag: ukFlag },
  { label: "Ireland", value: "Ireland", flag: irelandFlag },
  { label: "United States", value: "United States", flag: usFlag },
];

function EventForm() {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create a new event
      </h1>
      <Form
        layout="vertical"
        style={{
          background: "#f5f5f5",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Form.Item label={<b>Event Type</b>} style={{ flex: 1 }}>
            <Select placeholder="Select Options">
              <Select.Option value="type1">Virtual</Select.Option>
              <Select.Option value="type2">Physical</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={<b>Event Name</b>} style={{ flex: 1 }}>
            <Input placeholder="Enter event name" />
          </Form.Item>
          <Form.Item label={<b>Event Date</b>} style={{ flex: 1 }}>
            <DatePicker style={{ width: "100%" }} placeholder="Select date" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <Form.Item label={<b>Time</b>} style={{ flex: 1 }}>
            <Input placeholder="Enter time" />
          </Form.Item>
          <Form.Item label={<b>Location</b>} style={{ flex: 1 }}>
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item label={<b>Study level</b>} style={{ flex: 2 }}>
            <Checkbox.Group
              options={[
                "Undergraduate",
                "Postgraduate",
                "Doctorate",
                "Diploma",
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item label={<b>Description</b>}>
          <TextArea placeholder="Enter the description" rows={4} />
        </Form.Item>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Form.Item label={<b>Country</b>} style={{ flex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {countries.map((country) => (
                <Checkbox
                  key={country.value}
                  value={country.value}
                  style={{ flex: "1 1 30%" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={country.flag}
                      alt={country.label}
                      style={{ width: "20px", marginRight: "8px" }}
                    />
                    {country.label}
                  </div>
                </Checkbox>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label={<b>Cover picture</b>}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{
              flex: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              style={{ width: "104px", height: "104px" }}
            >
              <div
                style={{
                  width: "104px",
                  height: "104px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlusOutlined style={{ fontSize: "24px" }} />
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label={<b>Institutions</b>} style={{ flex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    showUploadList={false}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PlusOutlined style={{ fontSize: "16px" }} />
                    </div>
                  </Upload>
                </div>
              ))}
            </div>
            <Checkbox style={{ marginTop: "40px" }}>And more</Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EventForm;
