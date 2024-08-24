import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Checkbox,
  Dropdown,
  Menu,
  TimePicker,
  Form,
  DatePicker,
  Select,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import PageTitle from "../Components/PageTitle";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    date: "2024-07-13",
    name: "Dinith Wickramasinghe",
    mobile: "+94 715740136",
    email: "dinith.gsw@gmail.com",
    status: "Verified",
  },
  {
    key: "2",
    date: "2024-07-13",
    name: "Dinith Wickramasinghe",
    mobile: "+94 715740136",
    email: "dinith.gsw@gmail.com",
    status: "Not Verified",
  },
  {
    key: "3",
    date: "2024-07-14",
    name: "Dinith Wickramasinghe",
    mobile: "+94 715740136",
    email: "dinith.gsw@gmail.com",
    status: "Not Verified",
  },
  // Add more records as needed
];

const ParticipantList = () => {
  const [data, setData] = useState(initialData);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState({});
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const handleView = (record) => {
    setSelectedRecord(record);
    setVisible(true);
  };

  const handleConfirm = () => {
    const updatedData = data.map((item) =>
      item.key === selectedRecord.key ? { ...item, status: "Verified" } : item
    );
    setData(updatedData);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Report Generated!");
      setLoading(false);
    }, 2000);
  };

  const handleAssign = (key, counselor) => {
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [key]: counselor,
    }));
  };

  const handleRemove = (key) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = { ...prevAssignments };
      delete updatedAssignments[key];
      return updatedAssignments;
    });
  };

  const handleTimeChange = (time) => {
    setAppointmentTime(time ? time.format("HH:mm") : null);
  };

  const handleDateChange = (date) => {
    setAppointmentDate(date ? date.format("YYYY-MM-DD") : null);
  };

  const handleSendEmail = () => {
    if (!selectedRecord || !appointmentDate || !appointmentTime) {
      alert("Please fill in all appointment details.");
      return;
    }
    // Implement the email sending logic here
    alert(`Email sent to ${selectedRecord.email} with appointment details:
    Date: ${appointmentDate}
    Time: ${appointmentTime}`);
  };

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Verified" ? "green" : "red",
            fontWeight: status === "Verified" ? "bold" : "normal",
            textAlign: "center",
            display: "block",
            margin: "auto",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-4">
          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => handleAssign(record.key, "Counselor 1")}
                >
                  Counselor 1
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => handleAssign(record.key, "Counselor 2")}
                >
                  Counselor 2
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => handleAssign(record.key, "Counselor 3")}
                >
                  Counselor 3
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => handleAssign(record.key, "Counselor 4")}
                >
                  Counselor 4
                </Menu.Item>
                <Menu.Item key="5" onClick={() => handleRemove(record.key)}>
                  Remove
                </Menu.Item>
              </Menu>
            }
          >
            <Button style={{ padding: "4px 16px", width: "160px" }}>
              {assignments[record.key] ? assignments[record.key] : "Assign"}{" "}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Title */}
      <PageTitle title="Participants" />

      <div className="mb-3 pb-8 rounded border border-gray-200 lg:mx-10">
        <div className="flex justify-between items-center mt-8 mb-4 px-12">
          <div className="flex space-x-4">
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
            style={{ width: "200px" }}
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 px-6">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3"
                    style={{
                      textAlign:
                        col.key === "actions" || col.key === "status"
                          ? "center"
                          : "left",
                      verticalAlign: "middle",
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.key} className="bg-white border-b">
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.mobile}</td>
                  <td className="px-6 py-4">{row.email}</td>
                  <td className={`px-6 py-4 text-center`}>
                    <span
                      style={{
                        color: row.status === "Verified" ? "green" : "red",
                        fontWeight:
                          row.status === "Verified" ? "bold" : "normal",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex space-x-4 justify-center">
                      <Button type="default" onClick={() => handleView(row)}>
                        View
                      </Button>
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() =>
                                handleAssign(row.key, "Counselor 1")
                              }
                            >
                              Counselor 1
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() =>
                                handleAssign(row.key, "Counselor 2")
                              }
                            >
                              Counselor 2
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              onClick={() =>
                                handleAssign(row.key, "Counselor 3")
                              }
                            >
                              Counselor 3
                            </Menu.Item>
                            <Menu.Item
                              key="4"
                              onClick={() =>
                                handleAssign(row.key, "Counselor 4")
                              }
                            >
                              Counselor 4
                            </Menu.Item>
                            <Menu.Item
                              key="5"
                              onClick={() => handleRemove(row.key)}
                            >
                              Remove
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button style={{ padding: "4px 16px", width: "160px" }}>
                          {assignments[row.key]
                            ? assignments[row.key]
                            : "Assign"}{" "}
                          <DownOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        title="Participant Details"
        visible={visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        confirmLoading={loading}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="send" type="primary" onClick={handleSendEmail}>
            Send Email
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirm}>
            Confirm
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Event">
            <Input value={selectedRecord?.name} disabled />
          </Form.Item>
          <Form.Item label="EvID">
            <Input value={selectedRecord?.key} disabled />
          </Form.Item>
          <Form.Item label="First Name">
            <Input value={selectedRecord?.name.split(" ")[0]} disabled />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input value={selectedRecord?.name.split(" ")[1]} disabled />
          </Form.Item>
          <Form.Item label="Age">
            <Input value="N/A" disabled />
          </Form.Item>
          <Form.Item label="City of Residence">
            <Input value="N/A" disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={selectedRecord?.email} disabled />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input value={selectedRecord?.mobile} disabled />
          </Form.Item>
          <Form.Item label="How did you hear about this event?">
            <Input value="N/A" disabled />
          </Form.Item>
          <Form.Item>
            <Checkbox>Confirm Email</Checkbox>
            <Checkbox style={{ marginLeft: "10px" }}>
              Confirm Phone Number
            </Checkbox>
          </Form.Item>
          <Form.Item label="Appointment Date">
            <DatePicker onChange={handleDateChange} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Appointment Time">
            <TimePicker format="HH:mm" onChange={handleTimeChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParticipantList;
