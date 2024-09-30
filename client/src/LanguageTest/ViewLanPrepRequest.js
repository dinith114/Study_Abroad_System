import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // To format tables in the PDF
import PageTitle from '../Components/PageTitle';
import logo from "../Images/logo.png";

const RequestsTable = () => {
  const navigate = useNavigate();
  const [req, setReq] = useState([]);

  useEffect(() => {
    viewRequest();
  }, []);

  const viewRequest = async () => {
    let response = await axios.get("http://localhost:5000/languagePrep/viewlanguage-prep");
    console.log("res", response.data);
    setReq(response.data);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          icon={<MailOutlined />}
          onClick={() => handleEmailClick(record._id)}
        />
      ),
    },
  ];

  const handleEmailClick = async (id) => {
    console.log("id", id);
    let response = await axios.post(`http://localhost:5000/languagePrep/language-prep/${id}/send-email`);
    console.log("response11", response.data);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Load the logo image (you need the path or base64 string)
    const logoUrl = logo; // Replace with your logo path

    // Add the logo to the PDF (top-right corner)
    doc.addImage(logoUrl, 'PNG', 160, 10, 40, 20); // Adjust position and size

    // Set PDF title
    doc.setFontSize(20);
    doc.text("Language Requests Report", 14, 30); // Align to the left under the logo

    // Add the download date
    const downloadDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Downloaded on: ${downloadDate}`, 14, 40); // Adjust the position

    // Prepare the table data
    const tableColumn = ["Name", "Age", "Email", "Contact Number", "Gender"];
    const tableRows = [];

    req.forEach(record => {
      const recordData = [
        record.name,
        record.age,
        record.email,
        record.phone,
        record.gender
      ];
      tableRows.push(recordData);
    });

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50, // Position the table below the title and date
      theme: 'grid', // Modern grid style for the table
      styles: { fontSize: 10, halign: 'center', valign: 'middle' },
      headStyles: { fillColor: [22, 160, 133] }, // Modern color for table header
    });

    // Add company address in a similar format as the image you provided
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("GLOBAL REACH", 14, pageHeight - 40);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("12 Schofield Pl, Colombo 00300", 14, pageHeight - 30);
    doc.text("globalreachcolombo@gmail.com", 14, pageHeight - 25);
    doc.text("+94 77-222-4700", 14, pageHeight - 20); // Adjust the phone number format accordingly

    // Save the generated PDF
    doc.save("language_requests_report.pdf");
  };

  const handleNavigate = () => {
    navigate("/PackageList");
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <PageTitle title="Language Requests" />

      <div style={{ marginTop: '40px', maxWidth: '1500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Button
            type="primary"
            onClick={handleNavigate}
          >
            View Package List
          </Button>
          <Button
            type="primary"
            onClick={generatePDF}
          >
            Download PDF Report
          </Button>
        </div>
        <Table
          dataSource={req}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default RequestsTable;
