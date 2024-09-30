import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Dropdown, Menu, message, Popconfirm, Modal } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, DownOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function getStatusColor(status) {
  switch (status) {
    case 'Registered':
      return '#d9d9d9';
    case 'Under Review':
      return '#ffeb3b';
    case 'Accepted':
      return '#8bc34a';
    case 'Finalized':
      return '#388e3c';
    case 'Rejected':
      return '#f44336';
    default:
      return '#d9d9d9';
  }
}

function getColumns(handleStatusChange, handleEdit, handleDelete, handleSendEmail,handleNavigation, handleSearch) {
  
  return [
    {
      title: 'Registration No.',
      dataIndex: 'registrationNo',
      key: 'registrationNo',
      align: 'center',
      render: (text) => <div style={{ backgroundColor: '#f0f5ff', padding: '5px' }}>{text}</div>,
    },
    {
      title: 'Name',
      dataIndex: 'studentFullName',
      key: 'name',
    },
    {
      title: 'Mobile',
      dataIndex: 'phoneNumber',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Progress Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Dropdown
          overlay={getStatusMenu(handleStatusChange, record._id)}
          trigger={['click']}
        >
          <Button
            style={{
              backgroundColor: getStatusColor(status),
              borderColor: '#dcdcdc',
              fontWeight: 'bold',
              fontSize: '16px',
              height: '40px',
              width: '180px',
            }}
          >
            {status} <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button icon={<EyeOutlined />} style={{ marginRight: '8px', color: 'blue' }} onClick={() => handleNavigation(record._id)} />
          <Popconfirm
            title="Are you sure to update details of this student?"
            onConfirm={() => handleEdit(record._id)}
            okText="Yes"
            cancelText="No">
            <Button icon={<EditOutlined />} style={{ marginRight: '8px', color: 'blue' }}  />
          </Popconfirm>
          
          <Popconfirm
            title="Are you sure to delete this student?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No">
            <Button icon={<DeleteOutlined />} type="danger" style={{ marginRight: '8px', color: 'red' }} />
          </Popconfirm>

          <Button icon={<MailOutlined />} style={{ marginRight: '8px', color: 'blue' }} onClick={() => handleSendEmail(record._id)} />
        </div>
      ),
    },
  ];
}

function getStatusMenu(handleStatusChange, key) {
  return (
    <Menu
      onClick={(e) => handleStatusChange(e, key)}
      items={[
        { key: 'Registered', label: 'Registered' },
        { key: 'Under Review', label: 'Under Review' },
        { key: 'Accepted', label: 'Accepted' },
        { key: 'Finalized', label: 'Finalized' },
        { key: 'Rejected', label: 'Rejected' },
      ]}
    />
  );
}

function StudentList() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [emailMessage, setEmailMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [ filteredData, setFilteredData] = useState([]);
  const [ studentData, setStudentData] = useState([]);
  const [ searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    viewStudentApplication();
  }, []);
    useEffect(() => {
      handleSearch(searchQuery);
    }, [searchQuery, studentData]);

  const viewStudentApplication = async () => {
    let response = await axios.get(
      `http://localhost:5000/studentapp/viewStudentApplication`
    );
    setStudentData(response.data);
    setStudentList(response.data);
    setFilteredData(response.data);
  };

  const handleStatusChange = (e, key) => {
    const newData = studentList.map((item) => {
      if (item._id === key) {
        return { ...item, status: e.key };
      }
      return item;
    });
    setStudentList(newData);
  };

  const handleEdit = (id) => {
    navigate(`/editStudent?id=${id}`);
  };

  const handleNavigation = (id)=>{
    navigate(`/viewStudent?id=${id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/studentapp/removeStudentApplication/${id}`);
      message.success('Student deleted successfully');
      setStudentList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      message.error('Failed to delete student');
    }
  };

  const handleSearch = (query) => {
    console.log("query", query);
    if (!query) {
      setFilteredData(studentData); // Reset to full list if search query is empty
    } else {
      const filtered = studentData.filter(
        (student) =>
     
          student?.studentFullName?.toLowerCase()?.includes(query.toLowerCase()) ||
          student?.email?.toLowerCase()?.includes(query.toLowerCase()) ||
          student?.phoneNumber?.includes(query) 
          
          
        );
      setFilteredData(filtered);
    }
  };
  // const handleEmailClick = (student) => {
  //   setSelectedStudent(student);
  //   setEmailMessage(`Dear ${student.studentFullName},\n\nThis email is to inform you that your application is now in '${student.status}'.\n\nBest regards,\nYour Team`);
  //   setIsEmailModalVisible(true);
  // };

  // const handleEmailSend = async () => {
  //   console.log(

  //   )
  //   try {
  //     await axios.post(`http://localhost:5000/studentapp/sendEmail/${selectedStudent._id}`, { message: emailMessage });
  //     message.success('Email sent successfully');
  //     setIsEmailModalVisible(false);
  //     setEmailMessage('');
  //   } catch (error) {
  //     message.error('Failed to send email');
  //   }
  // };
  const handleSendEmail = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/studentapp/sendEmail/${id}`, // Ensure _id is passed here
        { message: emailMessage }
      );
      message.success('Email sent successfully');
      setIsEmailModalVisible(false);
      setEmailMessage('');
    } catch (error) {
      message.error('Failed to send email');
      console.error('Error:', error);
    }
  };
  

  const generateStudentReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Add logo and title (if you have a logo, load it as an image)
    // doc.addImage(logo, 'PNG', 160, 10, 40, 20); // Uncomment if you have a logo
    doc.setFontSize(18);
    doc.text("Student List Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);

    // Define table data
    const tableColumn = ["Full Name", "Mobile","Email", "Status"];
    const tableRows = [];

    filteredData.forEach((student) => {
      const rowData = [
        student.studentFullName,
        student.phoneNumber,
        student.email,
        student.status,
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
    doc.save("student_list_report.pdf");
  };


////////////////
  const columns = getColumns(handleStatusChange, handleEdit, handleDelete, handleSendEmail, handleNavigation, handleSearch);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="primary" onClick={() => navigate("/addStudent")}>New Registration</Button>
          <Button type="primary" onClick= {generateStudentReport}>
            Generate Report
          </Button>
        </div>
        <Input
          placeholder="Search by name, email, or mobile"
          prefix={<SearchOutlined />}

          // suffix={<SearchOutlined />}
          style={{ width: '300px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        // dataSource={studentList}
        dataSource={filteredData}
        pagination={false}
        bordered
        style={{ borderRadius: '8px', overflow: 'hidden' }}
      />

      {/* Email Modal */}
      <Modal
        title={`Send Email to ${selectedStudent ? selectedStudent.studentFullName : ''}`}
        visible={isEmailModalVisible}
        onOk={handleSendEmail}
        onCancel={() => setIsEmailModalVisible(false)}
      >
        <Input.TextArea
          rows={6}
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
          placeholder="Enter your message here..."
        />
      </Modal>
    </div>
  );
}

export default StudentList;
