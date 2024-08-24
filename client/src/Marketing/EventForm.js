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
import PageTitle from "../Components/PageTitle";

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
    <div>
      {/* Page Title */}
      <PageTitle title="Create a new event" />

      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <Form
          layout="vertical"
          style={{
            background: "#f5f5f5",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <Form.Item
              label={<b>Event Type</b>}
              style={{ flex: "1 1 30%", height: "64px" }} // Adjust height here
            >
              <Select
                placeholder="Select Options"
                style={{ width: "100%", height: "100%" }}
              >
                
                <Select.Option value="type2">Virtual</Select.Option>
                <Select.Option value="type3">Physical</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={<b>Event Name</b>}
              style={{ flex: "1 1 30%", height: "64px" }} // Adjust height here
            >
              <Input
                placeholder="Enter event name"
                style={{ height: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label={<b>Event Date</b>}
              style={{ flex: "1 1 30%", height: "64px" }} // Adjust height here
            >
              <DatePicker
                style={{ width: "100%", height: "100%" }}
                placeholder="Select date"
              />
            </Form.Item>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <Form.Item
              label={<b>Time</b>}
              style={{ flex: "1 1 30%", height: "64px" }} // Adjust height here
            >
              <Input placeholder="Enter time" style={{ height: "100%" }} />
            </Form.Item>
            <Form.Item
              label={<b>Location</b>}
              style={{ flex: "1 1 30%", height: "64px" }} // Adjust height here
            >
              <Input placeholder="Enter location" style={{ height: "100%" }} />
            </Form.Item>
            <Form.Item
              label={<b>Study level</b>}
              style={{ flex: "1 1 30%" }} // Keep height auto
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <Checkbox>Undergraduate</Checkbox>
                <Checkbox>Postgraduate</Checkbox>
                <Checkbox>Doctorate</Checkbox>
                <Checkbox>Diploma</Checkbox>
              </div>
            </Form.Item>
          </div>

          <Form.Item label={<b>Description</b>}>
            <TextArea placeholder="Enter the description" rows={4} />
          </Form.Item>

          <div
            style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
          >
            <Form.Item label={<b>Country</b>} style={{ flex: "1 1 30%" }}>
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
                flex: "1 1 30%",
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
            <Form.Item label={<b>Institutions</b>} style={{ flex: "1 1 30%" }}>
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
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Upload
                      action="/upload.do"
                      listType="picture-card"
                      showUploadList={false}
                      style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PlusOutlined
                          style={{ fontSize: "16px", cursor: "pointer" }}
                        />
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
    </div>
  );
}

export default EventForm;
