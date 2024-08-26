import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Descriptions, Divider, Spin } from 'antd';
import { AiOutlineArrowLeft, AiOutlinePrinter } from 'react-icons/ai';
import axios from 'axios';
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;

const LoanAppView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loanApp, setLoanApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoanApp = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/loan-applications/view/${id}`);
        setLoanApp(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching loan application:', error);
        setLoading(false);
      }
    };

    fetchLoanApp();
  }, [id]);

  const handlePrint = () => {
    const printContents = document.getElementById('print-section').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore the original contents after printing
  };

  const handleBack = () => {
    navigate('/loan-app-list');
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!loanApp) {
    return <div>Loan application not found</div>;
  }

  return (
    <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
      <PageTitle title={`Loan Application of ${loanApp.firstName} ${loanApp.lastName}`} />
      <div className="container mx-auto px-4 py-6 lg:w-4/6">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Button
            onClick={handleBack}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md px-4 py-2"
          >
            <AiOutlineArrowLeft className="mr-2" /> Back to Applications
          </Button>

          <Button
            type="primary"
            onClick={handlePrint}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
          >
            <AiOutlinePrinter className="mr-2" /> Print
          </Button>
        </div>

        <div id="print-section" className="bg-white p-6 shadow-md rounded-lg">
          <Title level={3} className="text-center text-2xl font-semibold mb-6">
            Loan Application of {loanApp.firstName} {loanApp.lastName}
          </Title>

          <Divider />

          <div className="text-lg">
            <Title level={4} className="mb-4">Student Information</Title>
            <Descriptions bordered column={1} size="middle" className="text-gray-800">
              <Descriptions.Item label="Student ID">{loanApp.studentId}</Descriptions.Item>
              <Descriptions.Item label="Full Name">{loanApp.firstName} {loanApp.lastName}</Descriptions.Item>
              <Descriptions.Item label="Address">{loanApp.address}</Descriptions.Item>
              <Descriptions.Item label="Email">{loanApp.email}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{loanApp.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="NIC Number">{loanApp.nic}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {new Date(loanApp.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={4} className="mb-4">Course Information</Title>
            <Descriptions bordered column={1} size="middle" className="text-gray-800">
              <Descriptions.Item label="University">{loanApp.university}</Descriptions.Item>
              <Descriptions.Item label="Program">{loanApp.program}</Descriptions.Item>
              <Descriptions.Item label="Total Program Fee">{loanApp.totalProgramFee}</Descriptions.Item>
              <Descriptions.Item label="Registration Fee">{loanApp.registrationFee}</Descriptions.Item>
              <Descriptions.Item label="Total Loan Amount">{loanApp.totalLoanAmount}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={4} className="mb-4">Bank Information</Title>
            <Descriptions bordered column={1} size="middle" className="text-gray-800">
              <Descriptions.Item label="Selected Bank">{loanApp.selectedBank}</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAppView;
