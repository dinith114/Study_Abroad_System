import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Typography, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;
const { Option } = Select;

const EditLoanApplication = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment these lines when the API is ready
        // const universitiesData = await axios.get('/api/universities');
        // const banksData = await axios.get('/api/banks');
        // setUniversities(universitiesData.data);
        // setBanks(banksData.data);

        const response = await axios.get(`http://localhost:5000/loan-applications/view/${id}`);
        const loanApplication = response.data;

        setPrograms(loanApplication.programs || []);
        form.setFieldsValue({
          ...loanApplication,
          birthDate: dayjs(loanApplication.birthDate),
        });
        setSelectedUniversity(loanApplication.university);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, form]);

  const handleUniversityChange = value => {
    setSelectedUniversity(value);
  };

  const handleProgramChange = value => {
    const selectedProgram = programs.find(prog => prog.id === value);
    if (selectedProgram) {
      form.setFieldsValue({
        totalProgramFee: selectedProgram.totalFee,
        registrationFee: selectedProgram.registrationFee,
        totalLoanAmount: selectedProgram.totalLoanAmount,
      });
    }
  };

  const handleSubmit = async values => {
    Modal.confirm({
      title: 'Are you sure you want to update the application?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          const formattedValues = {
            ...values,
            birthDate: values.birthDate.format('YYYY-MM-DD'),
          };
          await axios.put(`http://localhost:5000/loan-applications/update/${id}`, formattedValues);
          navigate('/loan-app-list');
        } catch (error) {
          console.error('Error updating loan application:', error);
        }
      },
    });
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Are you sure you want to cancel?',
      content: 'Any unsaved changes will be lost.',
      okText: 'Yes, Cancel',
      cancelText: 'No',
      onOk: () => {
        navigate('/loan-app-list');
      },
    });
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
      <PageTitle title="Edit Loan Application" />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
        <div className="flex flex-col md:flex-row w-full max-w-7xl">
          <div className="w-full p-4">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="bg-white p-10 rounded-xl shadow-lg"
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
                  <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="nic" label="NIC Number" rules={[{ required: true }]}>
                  <Input placeholder="NIC Number" />
                </Form.Item>
              </div>

              <Title level={2} className="text-2xl font-bold text-gray-800 mb-6 mt-10">
                Course Information
              </Title>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item name="university" label="University" rules={[{ required: true }]}>
                  <Select placeholder="Select University" onChange={handleUniversityChange}>
                    {universities.map(uni => (
                      <Option key={uni.id} value={uni.id}>
                        {uni.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="program" label="Program" rules={[{ required: true }]}>
                  <Select
                    placeholder="Select Program"
                    onChange={handleProgramChange}
                    disabled={!selectedUniversity}
                  >
                    {programs.map(prog => (
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
                <Select placeholder="Select a Bank">
                  {banks.map(bank => (
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
                  Update Application
                </motion.button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLoanApplication;
