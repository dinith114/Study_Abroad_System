import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import for table support
import chatbot from '../Images/chatbot-icon.jpg';
import logo from '../Images/logo.png'; // Import your logo
import PageTitle from '../Components/PageTitle';
import Chatbot from './Chatbot';

const ViewFeedback = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isdata, isSetData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    const res = await axios.get('http://localhost:5000/feedback/viewfeedbacks');
    isSetData(res.data);
  };

  const handleOneView = (id) => {
    navigate(`/FeedbackDetails?id=${id}`);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      ...getColumnSearchProps('surname'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Feedback',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleOneView(record._id)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  const navigateToOtherPage = () => {
    navigate('/FeedbackForm');
  };

  // Function to generate the feedback report as a PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the company logo in the top-right corner
    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 160, 10, 40, 20); // Adjust the position and size

    // Set PDF title
    doc.setFontSize(20);
    doc.text("Feedback Report", 14, 20);

    // Prepare the table data
    const tableColumn = ["Name", "Surname", "Email", "Feedback"];
    const tableRows = [];

    isdata.forEach(feedback => {
      const feedbackData = [
        feedback.name,
        feedback.surname,
        feedback.email,
        feedback.description,
      ];
      tableRows.push(feedbackData);
    });

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    // Add the download date
    const downloadDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Downloaded on: ${downloadDate}`, 14, doc.autoTable.previous.finalY + 10);

    // Add the company address in the bottom-left corner
    const addressYPosition = doc.autoTable.previous.finalY + 30;
    doc.setFontSize(10);
    doc.text(
      "Global Reach\n12 Schofield Pl, Colombo 00300\nEmail: globalreachcolombo@gmail.com\nPhone: +94 77-222-4700",
      14,
      addressYPosition
    );

    // Save the generated PDF
    doc.save("feedback_report.pdf");
  };

  return (
    <div style={{ padding: '50px' }}>
      <PageTitle title="View All Feedbacks" />
      <Button
        type="primary"
        onClick={generatePDF}
        style={{ marginBottom: '20px' }}
      >
        Download Feedback Report (PDF)                  
      </Button>
      <Table columns={columns} dataSource={isdata} />
      <Button
        type="primary"
        shape="circle"
        icon={<img src={chatbot} alt="Chatbot" style={{ width: '50px', height: '50px' }} />}
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '50px',
          zIndex: 1000,
        }}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
      />
      {isChatbotOpen && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 1000 }}>
          <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>

          {/* add feedback button*/}
          
 <Button type="primary" 
 onClick={navigateToOtherPage} > Add Feedback </Button> 
 <Button type="primary" onClick={generatePDF} style={{ marginLeft: '10px' }} > Download Feedback Report (PDF) </Button>
 </div>  

    </div>
  );
};

export default ViewFeedback;
