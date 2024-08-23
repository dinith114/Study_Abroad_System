import React, { useState } from "react";
import { Modal, Button, Input, Checkbox, Select, Menu, Dropdown } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    date: "13th July 2024",
    name: "Dinith Wickramasinghe",
    mobile: "+94 715740136",
    email: "dinith.gsw@gmail.com",
    status: "Verified",
  },
  {
    key: "2",
    date: "13th July 2024",
    name: "Dinith Wickramasinghe",
    mobile: "+94 715740136",
    email: "dinith.gsw@gmail.com",
    status: "not Verified",
  },
  {
    key: "3",
    date: "14th July 2024",
    name: "Dinith Wickramasinghe",
    mobile: "+94 715740136",
    email: "dinith.gsw@gmail.com",
    status: "not Verified",
  },

  // Add more records as needed
];

const ParticipantList = () => {
  const [data, setData] = useState(initialData);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleView = (record) => {
    console.log("record",record)
    setSelectedRecord(record);
    console.log("selectedRecord", selectedRecord);
    setVisible(true);
  };

  const handleConfirm = () => {
    console.log("awaaaa")
    const updatedData = data.map((item) =>
      item.key === selectedRecord.key ? { ...item, status: "Verified" } : item
    );
    setData(updatedData);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">Counselor 1</Menu.Item>
                <Menu.Item key="2">Counselor 2</Menu.Item>
                <Menu.Item key="3">Counselor 3</Menu.Item>
                <Menu.Item key="4">Counselor 4</Menu.Item>
                <Menu.Item key="5">Remove</Menu.Item>
              </Menu>
            }
          >
            <Button>
              Assign <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "24px" }}>Participants</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          marginTop: "60px",
          marginLeft: "120px",
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Select placeholder="Select Event" style={{ width: "200px" }}>
            <Option value="event1">Australia Education Exhibition</Option>
            <Option value="event2">New Zealand Education Exhibition</Option>
            <Option value="event3">UK Education Exhibition</Option>
            <Option value="event4">Canada Education Exhibition</Option>
          </Select>
          <Select placeholder="Sort by" style={{ width: "150px" }}>
            <Option value="counselor1">Counselor 1</Option>
            <Option value="counselor2">Counselor 2</Option>
            <Option value="counselor3">Counselor 3</Option>
            <Option value="counselor4">Counselor 4</Option>
          </Select>
        </div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: "200px", marginRight: "50px" }}
        />
      </div>
      <table
        style={{ width: "95%", margin: "0 auto", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "#f0f0f0",
                  textAlign: col.key === "actions" ? "right" : "left",
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.key}>
              <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                {row.date}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                {row.name}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                {row.mobile}
              </td>
              <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                {row.email}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ccc",
                  backgroundColor:
                    row.status === "Verified" ? "green" : "transparent",
                  color: row.status === "Verified" ? "white" : "black",
                }}
              >
                {row.status}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "right",
                }}
              >
                <Button type="default" onClick={() => handleView(row)}>
                  View
                </Button>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Counselor 1</Menu.Item>
                      <Menu.Item key="2">Counselor 2</Menu.Item>
                      <Menu.Item key="3">Counselor 3</Menu.Item>
                      <Menu.Item key="4">Counselor 4</Menu.Item>
                      <Menu.Item key="5">Remove</Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    Assign <DownOutlined />
                  </Button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRecord && (
        <Modal
          title="Participant Details"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <p>Event: {selectedRecord.event}</p>
          <p>EvID: GR234</p>
          <p>First Name: {selectedRecord.name.split(" ")[0]}</p>
          <p>Last Name: {selectedRecord.name.split(" ")[1]}</p>
          <p>Age: 25</p> {/* Replace with dynamic data if available */}
          <p>City of Residence: Colombo</p> {/* Replace with dynamic data */}
          <p>Email: {selectedRecord.email}</p>
          <Checkbox>Email Confirmed</Checkbox>
          <p>Mobile: {selectedRecord.mobile}</p>
          <Checkbox>Mobile Confirmed</Checkbox>
          <p>How did you hear about this event?</p>
          <Input placeholder="Enter details" />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ParticipantList;
