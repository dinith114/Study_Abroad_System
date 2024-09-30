import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; 



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

   const navigate = useNavigate();
   const [eventRegisterData, setEventRegisterData] = useState([]);
   const [bindCounselor,setBindCounselor] = useState("")
   const [data, setData] = useState(initialData);
   const [visible, setVisible] = useState(false);
   const [selectedRecord, setSelectedRecord] = useState(null);
   const [loading, setLoading] = useState(false);
   const [assignments, setAssignments] = useState({});
   const [appointmentTime, setAppointmentTime] = useState(null);
   const [appointmentDate, setAppointmentDate] = useState(null);
   const [status, setStatus] = useState(false);
   const [eventName,setEventName] = useState("")
     const [filteredData, setFilteredData] = useState(eventRegisterData); 
     const [searchQuery, setSearchQuery] = useState(""); 

   
  useEffect(() => {
    viewRegisterEvent();
  }, []);
    useEffect(() => {
      handleSearch(searchQuery); // Filter data whenever search query changes
    }, [searchQuery, eventRegisterData]); 

    useEffect(() => {
      const storedAssignments = localStorage.getItem("assignments");
      if (storedAssignments) {
        setAssignments(JSON.parse(storedAssignments)); // Load from local storage
      }
    }, []);

  const viewRegisterEvent = async () => {
    let response = await axios.get(
      `http://localhost:5000/eventRegister/viewRegisterEvent`
    );
    console.log("response", response.data);
    setEventRegisterData(response.data);
      setFilteredData(response.data);
    console.log("eventRegisterData", eventRegisterData);
  };

  const handleSearch = (query) => {
    console.log("query", query);
    if (!query) {
      setFilteredData(eventRegisterData); // Reset to full list if search query is empty
    } else {
      const filtered = eventRegisterData.filter(
        (participant) =>
     
    
          participant?.firstName?.toLowerCase()?.includes(query.toLowerCase()) ||
          participant?.lastName?.toLowerCase()?.includes(query.toLowerCase()) ||
          participant?.email?.toLowerCase()?.includes(query.toLowerCase()) ||
          participant?.phone?.includes(query) || 
          participant?.eventName?.includes(query) 
          
         
      );
      setFilteredData(filtered);
    }
  };

  const handleView = async(id) => {
    console.log("record",id)
   let response = await axios.get(
     `http://localhost:5000/eventRegister/viewOneRegisterEvent/${id}`
   );
    console.log("response", response.data);
    setSelectedRecord(response.data);
    setVisible(true);
  };

  const handleConfirm = async() => {
    let response = await axios.put(
      `http://localhost:5000/eventRegister/verification/${selectedRecord._id}`
    );
    console.log("response",response)
     viewRegisterEvent();
  setStatus(true);
    // setData(updatedData);
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

  const handleAssign = async(key, counselor) => {
    console.log("key", key);
       console.log("counselor", counselor);
 
    console.log("assignments", assignments);
      let response = await axios.put(
        `http://localhost:5000/eventRegister/assignCounselor/${key}/${counselor}`
      );
       const assignedCounselor = response.data.counselor;
          setAssignments((prevAssignments) => {
            const newAssignments = {
              ...prevAssignments,
              [key]: assignedCounselor,
            };
            localStorage.setItem("assignments", JSON.stringify(newAssignments)); // Save to local storage
            return newAssignments;
          });
  
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

  const handleSendEmail = async() => {
   console.log(
     "selectedRecord?.email,selectedRecord?.firstName",
     selectedRecord?.email,
     selectedRecord?.firstName
   );
  
    // Implement the email sending logic here
    // alert(`Email sent to ${selectedRecord.email} with appointment details:
    // Date: ${appointmentDate}
    // Time: ${appointmentTime}`);
     await axios.post(
       `http://localhost:5000/eventRegister/sendEmail/${selectedRecord?.email}/${appointmentDate}/${appointmentTime}/${selectedRecord?.firstName}`
     );
       setVisible(false);

  };

  const generateParticipantReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Add logo and title (if you have a logo, load it as an image)
    // doc.addImage(logo, 'PNG', 160, 10, 40, 20); // Uncomment if you have a logo
    doc.setFontSize(18);
    doc.text("Participant List Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);

    // Define table data
    const tableColumn = ["First Name", "Last Name","Event Name" ,"Email", "Status"];
    const tableRows = [];

    filteredData.forEach((participant) => {
      const rowData = [
        participant.firstName,
        participant.lastName,
        participant.eventName,
        participant.email,
        participant.status,
      ];
      tableRows.push(rowData);
    });

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    // Add company address at the bottom (or any footer content)
    doc.setFontSize(10);
    doc.text("Global Reach", 14, doc.internal.pageSize.height - 30);
    doc.text(
      "12 Schofield Pl, Colombo 00300",
      14,
      doc.internal.pageSize.height - 25
    );
    doc.text(
      "globalreachcolombo@gmail.com | +94 77-222-4700",
      14,
      doc.internal.pageSize.height - 20
    );

    // Save the PDF
    doc.save("participant_list_report.pdf");
  };


  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Event", dataIndex: "eventName", key: "eventName" },
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
                  onClick={() => handleAssign(record._id, "Counselor 1")}
                >
                  Counselor 1
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => handleAssign(record._id, "Counselor 2")}
                >
                  Counselor 2
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => handleAssign(record._id, "Counselor 3")}
                >
                  Counselor 3
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => handleAssign(record._id, "Counselor 4")}
                >
                  Counselor 4
                </Menu.Item>
                <Menu.Item key="5" onClick={() => handleRemove(record._id)}>
                  Remove
                </Menu.Item>
              </Menu>
            }
          >
            {/* <Button style={{ padding: "4px 16px", width: "160px" }}>
              {assignments[record.key] ? assignments[record.key] : "Assign"}{" "}
              <DownOutlined />
            </Button> */}
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
            <Input
              placeholder="Search by name, email, or mobile"
              prefix={<SearchOutlined />}
              style={{ width: "300px" }}
              value={searchQuery} // Bind the search query state
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
          </div>

          <Button type="primary" onClick={generateParticipantReport}>
            Download Participant List Report
          </Button>
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
              {filteredData.map((row) => (
                <tr key={row.key} className="bg-white border-b">
                  <td className="px-6 py-4">{row.createdAt.split("T")[0]}</td>
                  <td className="px-6 py-4">
                    {row.firstName} {row.lastName}
                  </td>
                  <td className="px-6 py-4">{row.eventName}</td>
                  <td className="px-6 py-4">{row.phone}</td>
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
                      <Button
                        type="default"
                        onClick={() => handleView(row._id)}
                      >
                        View
                      </Button>
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() =>
                                handleAssign(row._id, "Counselor 1")
                              }
                            >
                              Counselor 1
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() =>
                                handleAssign(row._id, "Counselor 2")
                              }
                            >
                              Counselor 2
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              onClick={() =>
                                handleAssign(row._id, "Counselor 3")
                              }
                            >
                              Counselor 3
                            </Menu.Item>
                            <Menu.Item
                              key="4"
                              onClick={() =>
                                handleAssign(row._id, "Counselor 4")
                              }
                            >
                              Counselor 4
                            </Menu.Item>
                            <Menu.Item
                              key="5"
                              onClick={() => handleRemove(row._id)}
                            >
                              Remove
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button style={{ padding: "4px 16px", width: "160px" }}>
                          {assignments[row._id]
                            ? assignments[row._id]
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
            <Input
              value={selectedRecord?.eventName || ""}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="EvID">
            <Input value="GR00123" style={{ color: "grey" }} disabled />
          </Form.Item>
          <Form.Item label="First Name">
            <Input
              value={selectedRecord?.firstName}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              value={selectedRecord?.lastName}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="Age">
            <Input
              value={selectedRecord?.age}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="City of Residence">
            <Input
              value={selectedRecord?.address}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={selectedRecord?.email}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input
              value={selectedRecord?.phone}
              style={{ color: "grey" }}
              disabled
            />
          </Form.Item>
          <Form.Item label="How did you hear about this event?">
            <Input
              value={selectedRecord?.aboutEvent}
              style={{ color: "grey" }}
              disabled
            />
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
