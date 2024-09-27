import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FileOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Required for tables in PDF
import PageTitle from '../Components/PageTitle';
import logo from '../Images/logo.png'; // Add the path to your logo image

const { Title } = Typography;

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    fetchMonthlyData();
    fetchYearlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Current month
      console.log("month",month)
      const year = today.getFullYear();
      console.log("year",year)
      const response = await axios.get(`http://localhost:5000/financial/financials/monthly/${month}/${year}`);
      console.log("response",response)
      setMonthlyData(response.data);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  const fetchYearlyData = async () => {
    try {
      const year = new Date().getFullYear(); // Current year
      const response = await axios.get(`http://localhost:5000/financial/financials/yearly/${year}`);
      setYearlyData([response.data]);
    } catch (error) {
      console.error('Error fetching yearly data:', error);
    }
  };

  // Function to generate the Monthly Financial Report as PDF
  const generateMonthlyReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Add logo and title
    doc.addImage(logo, 'PNG', 160, 10, 40, 20); // Adjust the logo position/size
    doc.setFontSize(18);
    doc.text('Monthly Financial Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);

    // Table data for monthly report
    const tableColumn = ['Month', 'Income', 'Expense', 'Profit'];
    const tableRows = [];

    monthlyData.forEach((item) => {
      const rowData = [item.month, item.income, item.expense, item.profit];
      tableRows.push(rowData);
    });

    // Add table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    // Add company address at the bottom
    doc.setFontSize(10);
    doc.text('Global Reach', 14, 270);
    doc.text('12 Schofield Pl, Colombo 00300', 14, 275);
    doc.text('globalreachcolombo@gmail.com | +94 77-222-4700', 14, 280);

    // Save the PDF
    doc.save('monthly_financial_report.pdf');
  };

  // Function to generate the Yearly Financial Report as PDF
  const generateYearlyReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Add logo and title
    doc.addImage(logo, 'PNG', 160, 10, 40, 20); // Adjust the logo position/size
    doc.setFontSize(18);
    doc.text('Yearly Financial Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);

    // Table data for yearly report
    const tableColumn = ['Year', 'Income', 'Expense', 'Profit'];
    const tableRows = [];

    yearlyData.forEach((item) => {
      const rowData = [item.year, item.income, item.expense, item.profit];
      tableRows.push(rowData);
    });

    // Add table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    // Add company address at the bottom
    doc.setFontSize(10);
    doc.text('Global Reach', 14, 270);
    doc.text('12 Schofield Pl, Colombo 00300', 14, 275);
    doc.text('globalreachcolombo@gmail.com | +94 77-222-4700', 14, 280);

    // Save the PDF
    doc.save('yearly_financial_report.pdf');
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <PageTitle title="Company Financial Dashboard" />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Monthly Income vs Expenses" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#8884d8" />
                <Bar dataKey="expense" fill="#82ca9d" />
                <Bar dataKey="profit" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Yearly Income vs Expenses" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8884d8" />
                <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
                <Line type="monotone" dataKey="profit" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button type="primary" size="large" icon={<FileOutlined />} onClick={generateMonthlyReport} style={{ marginRight: '10px' }}>
          Download Monthly Report
        </Button>
        <Button type="primary" size="large" icon={<FileOutlined />} onClick={generateYearlyReport}>
          Download Yearly Report
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
