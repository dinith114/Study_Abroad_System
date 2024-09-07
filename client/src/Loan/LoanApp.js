import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import BankCard from './BankCard';
import BankDetailsModal from './BankDetailsModal';
import ComparePopup from './ComparePopup';
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;
const { Option } = Select;

function ApplyLoan() {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [universities, setUniversities] = useState([
    { id: 1, name: 'University A', programs: [
      { id: 1, name: 'Program A1', totalFee: 5000, registrationFee: 500 },
      { id: 2, name: 'Program A2', totalFee: 5500, registrationFee: 550 }
    ]},
    { id: 2, name: 'University B', programs: [
      { id: 3, name: 'Program B1', totalFee: 6000, registrationFee: 600 },
      { id: 4, name: 'Program B2', totalFee: 6500, registrationFee: 650 }
    ]}
  ]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form] = Form.useForm();
  
  // State to store bank data fetched from the backend
  const [banks, setBanks] = useState([]);

  // Fetch banks data from backend when component mounts
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/banks/list');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching bank data:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleUniversityChange = (universityId) => {
    const university = universities.find((uni) => uni.id === universityId);
    if (university) {
      setPrograms(university.programs);
      setSelectedUniversity(universityId);
      form.setFieldsValue({ program: undefined, totalProgramFee: '', registrationFee: '', totalLoanAmount: '' });
    }
  };

  const handleProgramChange = (programId) => {
    const program = programs.find((prog) => prog.id === programId);
    if (program) {
      form.setFieldsValue({
        totalProgramFee: program.totalFee,
        registrationFee: program.registrationFee,
        totalLoanAmount: program.totalFee + program.registrationFee
      });
      setSelectedProgram(programId);
    }
  };

  const handleViewClick = (bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleOpenCompare = () => {
    setIsCompareOpen(true);
  };

  const handleCloseCompare = () => {
    setIsCompareOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      const universityName = universities.find(uni => uni.id === selectedUniversity)?.name || '';
      const program = programs.find(prog => prog.id === selectedProgram);
      const programName = program?.name || '';
      const bankName = values.selectedBank || '';
  
      const totalProgramFee = program?.totalFee || 0;
      const registrationFee = program?.registrationFee || 0;
      const totalLoanAmount = totalProgramFee + registrationFee;
      const nic = values.nicNumber;  // Use the correct key for NIC
  
      const payload = {
        ...values,
        university: universityName,
        program: programName,
        selectedBank: bankName,
        totalProgramFee,  // Adding required field
        registrationFee,  // Adding required field
        totalLoanAmount,  // Adding required field
        nic,  // Adding required field
      };
  
      console.log('Payload:', payload);
  
      const response = await axios.post('http://localhost:5000/loan-applications/add', payload);
  
      console.log('Response:', response.data);
      alert('Loan application submitted successfully!');
      navigate('/loan-app-list');
    } catch (error) {
      console.error('Error submitting loan application:', error.response ? error.response.data : error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const handleUploadDocument = () => {
    navigate('/upload-do');
  };

  const handleCancel = () => {
    navigate('/loan-app-list');
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
      <PageTitle title="Student Loan Application" />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
        <div className="flex flex-col md:flex-row w-full max-w-7xl">
          <div className="w-full md:w-1/2 p-4">
            <Form
              onFinish={handleSubmit}
              className="bg-white p-10 rounded-xl shadow-lg"
              layout="vertical"
              form={form}
            >
              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6">
                Student Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="studentId"
                  label="Student ID"
                  rules={[{ required: true, message: 'Please enter Student ID' }]}
                >
                  <Input placeholder="Student ID" />
                </Form.Item>

                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    { required: true, message: 'Please enter First Name' },
                    { 
                      pattern: /^[A-Z][a-z]*$/, 
                      message: 'Start with a capital letter' 
                    }
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    { required: true, message: 'Please enter Last Name' },
                    { 
                      pattern: /^[A-Z][a-z]*$/, 
                      message: 'Start with a capital letter' 
                    }
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter Address' }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter Email' },
                    { type: 'email', message: 'Please enter a valid Email' }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    { required: true, message: 'Please enter Phone Number' },
                    { 
                      pattern: /^07\d{8}$/, 
                      message: 'Phone Number must start with 07 and be 10 digits long' 
                    }
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                  name="birthDate"
                  label="Birth Date"
                  rules={[
                    { required: true, message: 'Please enter Birth Date' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject('Please enter Birth Date');
                        }
                        const birthDate = new Date(value);
                        const today = new Date();
                        const age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        const dayDiff = today.getDate() - birthDate.getDate();

                        if (
                          age > 16 || 
                          (age === 16 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject('You must be at least 16 years old');
                      }
                    })
                  ]}
                >
                  <Input placeholder="Birth Date" type="date" />
                </Form.Item>

                <Form.Item
                  name="nicNumber"
                  label="NIC Number"
                  rules={[
                    { required: true, message: 'Please enter NIC Number' },
                    { 
                      pattern: /^(\d{9}[vV]|\d{12})$/, 
                      message: 'Enter valid NIC number' 
                    }
                  ]}
                >
                  <Input placeholder="NIC Number" />
                </Form.Item>
              </div>

              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6 mt-10">
                Course Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item name="university" label="University" rules={[{ required: true }]}>
                  <Select placeholder="Select University" onChange={handleUniversityChange}>
                    {universities.map((uni) => (
                      <Option key={uni.id} value={uni.id}>
                        {uni.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="program" label="Program" rules={[{ required: true }]}>
                  <Select placeholder="Select Program" onChange={handleProgramChange} disabled={!selectedUniversity}>
                    {programs.map((prog) => (
                      <Option key={prog.id} value={prog.id}>
                        {prog.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="totalProgramFee" label="Total Program Fee">
                  <Input placeholder="Total Program Fee" disabled />
                </Form.Item>
                <Form.Item name="registrationFee" label="Registration Fee">
                  <Input placeholder="Registration Fee" disabled />
                </Form.Item>
                <Form.Item name="totalLoanAmount" label="Total Loan Amount">
                  <Input placeholder="Total Loan Amount" disabled />
                </Form.Item>
              </div>

              <Form.Item
                name="selectedBank"
                label="Select Bank"
                rules={[{ required: true, message: 'Please select a bank' }]}
              >
                <Select placeholder="Select Bank">
                  {banks.map((bank) => (
                    <Option key={bank._id} value={bank.bankName}>
                      {bank.bankName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="flex flex-wrap justify-between mt-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="primary" htmlType="submit" className="w-full md:w-auto">
                    Submit Application
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleCancel} className="w-full md:w-auto">
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleOpenCompare} className="w-full md:w-auto">
                    Compare Banks
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleUploadDocument} className="w-full md:w-auto">
                    Upload Documents
                  </Button>
                </motion.div>
              </div>
            </Form>
          </div>
          <div className="w-full md:w-1/2 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banks.map((bank) => (
              <motion.div
                key={bank._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleViewClick(bank)}  // Pass the bank data here
              >
                <BankCard
                  bankName={bank.bankName}
                  rank={bank.rank}
                  logo={bank.logo}
                  onViewClick={() => handleViewClick(bank)}  // Passing the function to open the modal
                />
              </motion.div>
            ))}
          </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && selectedBank && (
        <BankDetailsModal bank={selectedBank} onClose={handleCloseModal} />
      )}
      {isCompareOpen && (
        <ComparePopup onClose={handleCloseCompare} />
      )}
    </div>
  );
}

export default ApplyLoan;
