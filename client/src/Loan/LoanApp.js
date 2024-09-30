import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Typography, notification } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import BankCard from './BankCard';
import BankDetailsModal from './BankDetailsModal';
import ComparePopup from './ComparePopup';
import PageTitle from '../Components/PageTitle';
import emailjs from '@emailjs/browser';

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

  // Sample dataset for student information
  const sampleStudents = [
    {
      studentId: '12345',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      email: 'pasancp2000@gmail.com',
      phoneNumber: '0712345678',
      birthDate: '2000-01-01',
      nicNumber: '200123456V'
    },
    {
      studentId: '67890',
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Elm St',
      email: 'pasancp2000@gmail.com',
      phoneNumber: '0787654321',
      birthDate: '1999-05-12',
      nicNumber: '199987654V'
    }
  ];
  
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

  // Send email after successful submission
  const sendEmail = async (payload) => {
    const serviceId = 'service_sgojxrq';
    const templateId = 'template_fdwp84n';
    const publicKey = 'gqgwN25yZzv5oiipv';
  
    const templateParams = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      studentId: payload.studentId,
      university: payload.university,
      program: payload.program,
      totalProgramFee: payload.totalProgramFee,
      registrationFee: payload.registrationFee,
      totalLoanAmount: payload.totalLoanAmount,
      selectedBank: payload.selectedBank,
      status: "Documenting",
      reply_to: "pasanmahela73@gmail.com",
      email: payload.email,
    };
  
    console.log('Template Params:', templateParams);  // Debugging line
  
    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);  // Enhanced error logging
    }
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

      // Send email
      await sendEmail(payload);

      // Show success notification
      notification.success({
        message: 'Success',
        description: 'Loan application submited successfully.',
      });
      
      // alert('Loan application submitted successfully!');
      navigate('/loan-app-list');
    } catch (error) {
      // console.error('Error submitting loan application:', error.response ? error.response.data : error.message);
      // alert('An error occurred. Please try again.');
      // Show error notification
      notification.error({
        message: 'Error',
        description: 'LAn error occurred. Please try again.',
      });
    }
  };

  // Function to search for student information by Student ID
  const handleSearchStudent = () => {
    const studentId = form.getFieldValue('studentId');
    const student = sampleStudents.find(s => s.studentId === studentId);

    if (student) {
      form.setFieldsValue({
        firstName: student.firstName,
        lastName: student.lastName,
        address: student.address,
        email: student.email,
        phoneNumber: student.phoneNumber,
        birthDate: student.birthDate,
        nicNumber: student.nicNumber
      });
      notification.success({
        message: 'Student Found',
        description: `Student data for ${studentId} loaded successfully.`,
      });
    } else {
      notification.error({
        message: 'Student Not Found',
        description: `No student found with ID: ${studentId}.`,
      });
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
  {/* Student ID */}
  <Form.Item
    name="studentId"
    label="Student ID"
    rules={[{ required: true, message: 'Please enter Student ID' }]}
  >
    <Input placeholder="Student ID" />
  </Form.Item>
  {/* Search Student */}
  <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button onClick={handleSearchStudent}>Search Student</Button>
  </motion.div>
  
  {/* First Name */}
  <Form.Item
    name="firstName"
    label="First Name"
    rules={[
      { required: true, message: 'Please enter First Name' },
      { pattern: /^[A-Z][a-z]*$/, message: 'Start with a capital letter' }
    ]}
  >
    <Input placeholder="First Name" />
  </Form.Item>
  {/* Last Name */}
  <Form.Item
    name="lastName"
    label="Last Name"
    rules={[
      { required: true, message: 'Please enter Last Name' },
      { pattern: /^[A-Z][a-z]*$/, message: 'Start with a capital letter' }
    ]}
  >
    <Input placeholder="Last Name" />
  </Form.Item>

  {/* Address */}
  <Form.Item
    name="address"
    label="Address"
    rules={[{ required: true, message: 'Please enter Address' }]}
  >
    <Input placeholder="Address" />
  </Form.Item>
  {/* Email */}
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

  {/* Phone Number */}
  <Form.Item
    name="phoneNumber"
    label="Phone Number"
    rules={[
      { required: true, message: 'Please enter Phone Number' },
      { pattern: /^07\d{8}$/, message: 'Phone Number must start with 07 and be 10 digits long' }
    ]}
  >
    <Input placeholder="Phone Number" />
  </Form.Item>
  {/* Birth Date */}
  <Form.Item
    name="birthDate"
    label="Birth Date"
    rules={[{ required: true, message: 'Please enter Birth Date' }]}
  >
    <Input 
      placeholder="Birth Date" 
      type="date" 
      max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0]} 
    />
  </Form.Item>

  {/* NIC Number */}
  <Form.Item
    name="nicNumber"
    label="NIC Number"
    rules={[
      { required: true, message: 'Please enter NIC Number' },
      { pattern: /^(\d{9}[vV]|\d{12})$/, message: 'Enter valid NIC number' }
    ]}
  >
    <Input placeholder="NIC Number" />
  </Form.Item>
</div>


              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6 mt-10">
                Course Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* University */}
  <Form.Item name="university" label="University" rules={[{ required: true }]}>
    <Select placeholder="Select University" onChange={handleUniversityChange}>
      {universities.map((uni) => (
        <Option key={uni.id} value={uni.id}>
          {uni.name}
        </Option>
      ))}
    </Select>
  </Form.Item>

  {/* Program */}
  <Form.Item name="program" label="Program" rules={[{ required: true }]}>
    <Select 
      placeholder="Select Program" 
      onChange={handleProgramChange} 
      disabled={!selectedUniversity}
    >
      {programs.map((prog) => (
        <Option key={prog.id} value={prog.id}>
          {prog.name}
        </Option>
      ))}
    </Select>
  </Form.Item>

  {/* Total Program Fee */}
  <Form.Item name="totalProgramFee" label="Total Program Fee">
    <Input placeholder="Total Program Fee" disabled />
  </Form.Item>

  {/* Registration Fee */}
  <Form.Item name="registrationFee" label="Registration Fee">
    <Input placeholder="Registration Fee" disabled />
  </Form.Item>

  {/* Total Loan Amount */}
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
          <div className="w-full lg:w-1/2 p-4">
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
                  logo={`http://localhost:5000${bank.bankIcon}`}
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
