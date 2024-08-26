import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import BankCard from './BankCard';
import BankDetailsModal from './BankDetailsModal';
import ComparePopup from './ComparePopup';
import PageTitle from '../Components/PageTitle';
import BOC from '../Images/boc.png';
import HNB from "../Images/hnb.png";
import dfcc from "../Images/dfcc.jpg";
import peoples from "../Images/peoples.png";
import seylan from "../Images/seylan.jpg";
import nsb from "../Images/nsb.png";
import panasia from "../Images/panasia.jpg";
import sampath from "../Images/sampath.jpg";

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

  const banks = [
    { id: 1, name: 'Bank of Ceylon', rank: 1, logo: BOC },
    { id: 2, name: 'Hatton National Bank', rank: 2, logo: HNB },
    { id: 3, name: 'DFCC Bank', rank: 3, logo: dfcc },
    { id: 4, name: 'People’s Bank', rank: 4, logo: peoples },
    { id: 5, name: 'Seylan Bank', rank: 5, logo: seylan },
    { id: 6, name: 'NSB', rank: 6, logo: nsb },
    { id: 7, name: 'Pan Asia Bank', rank: 7, logo: panasia },
    { id: 8, name: 'Sampath Bank', rank: 8, logo: sampath },
  ];

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
                <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
                  <Input placeholder="Student ID" />
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                  <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item name="birthDate" label="Birth Date" rules={[{ required: true }]}>
                  <Input placeholder="Birth Date" type="date" />
                </Form.Item>
                <Form.Item name="nicNumber" label="NIC Number" rules={[{ required: true }]}>
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
  <Select
    placeholder="Select a Bank"
    onChange={(value) => setSelectedBank(value)} // Set selectedBank directly
  >
    {banks.map((bank) => (
      <Option key={bank.id} value={bank.name}>
        {bank.name}
      </Option>
    ))}
  </Select>
</Form.Item>

              <div className="flex justify-between mt-6">
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-500 text-white py-2 px-16 rounded-full text-lg font-semibold shadow-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  className="bg-grNavTextHov hover:bg-grNavText text-white py-2 px-8 rounded-full text-lg font-semibold shadow-lg"
                >
                  Apply for Loan
                </motion.button>
              </div>
            </Form>
          </div>

          <div className="w-full md:w-1/2 p-4 flex flex-col space-y-6">
            <div className="flex justify-center space-x-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                onClick={handleOpenCompare}
                className="bg-grNavTextHov text-white py-3 px-4 rounded-full text-lg font-semibold shadow-lg w-2/5"
              >
                Compare Banks
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                onClick={handleUploadDocument}
                className="bg-grNavTextHov text-white py-3 px-4 rounded-full text-lg font-semibold shadow-lg w-2/5"
              >
                Upload Document
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-4">
              {banks.map((bank) => (
                <motion.div 
                  key={bank.id} 
                  className="relative" 
                  whileHover={{ scale: 1.05 }}
                >
                  <BankCard
                    bankName={bank.name}
                    rank={bank.rank}
                    logo={bank.logo}
                    isSelected={selectedBank?.id === bank.id}
                    onClick={() => handleViewClick(bank)}
                    onViewClick={() => handleViewClick(bank)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BankDetailsModal bank={selectedBank} onClose={handleCloseModal} />
      )}

      {isCompareOpen && (
        <ComparePopup onClose={handleCloseCompare} />
      )}
    </div>
  );
}

export default ApplyLoan;
