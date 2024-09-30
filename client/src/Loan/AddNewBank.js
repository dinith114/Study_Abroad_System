import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

function AddNewBank() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (info) => {
    let files = [...info.fileList];
    // Restrict to a single file by truncating the fileList array to the first element
    files = files.slice(-1);
    setFileList(files);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    
    // Append all fields from the form to FormData
    formData.append('bankName', values.bankName);
    formData.append('interestRate', values.interestRate);
    formData.append('rank', values.rank);
    formData.append('maxLoan', values.maxLoan);
    formData.append('repaymentPeriod', values.repaymentPeriod);
    formData.append('purpose', values.purpose);
    formData.append('documentsRequired', JSON.stringify(values.documentsRequired));
    formData.append('eligiblePersons', JSON.stringify(values.eligiblePersons));
    formData.append('benefits', JSON.stringify(values.benefits));

    // Check if the file list contains an uploaded file
    if (fileList.length > 0) {
      formData.append('bankIcon', fileList[0].originFileObj);
    } else {
      message.error('Please upload a bank icon.');
      return; // Stop the form submission if no image is provided
    }

    try {
      await axios.post('http://localhost:5000/banks/add', formData); // No Content-Type header needed
      message.success('Bank added successfully!');
      form.resetFields();
      setFileList([]);
      navigate('/bank-list');
    } catch (error) {
      message.error('Failed to add bank. Please try again.');
      console.error('Error adding bank:', error.response?.data || error);
    }
  };

  const handleViewBanks = () => {
    navigate('/bank-list');
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Bank</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        <Form.Item
          name="bankName"
          label="Bank Name"
          rules={[{ required: true, message: 'Please enter the bank name' }]}
        >
          <Input placeholder="Enter bank name" />
        </Form.Item>

        <Form.Item
          name="interestRate"
          label="Interest Rate"
          rules={[{ required: true, message: 'Please enter the interest rate' }]}
        >
          <InputNumber
            min={0}
            max={100}
            step={0.01}
            placeholder="Enter interest rate"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="rank"
          label="Rank"
          rules={[{ required: true, message: 'Please enter the rank' }]}
        >
          <InputNumber min={1} placeholder="Enter rank" className="w-full" />
        </Form.Item>

        <Form.Item
          name="maxLoan"
          label="Max Loan Amount"
          rules={[{ required: true, message: 'Please enter the max loan amount' }]}
        >
          <InputNumber min={0} placeholder="Enter max loan amount" className="w-full" />
        </Form.Item>

        <Form.Item
          name="repaymentPeriod"
          label="Repayment Period (months)"
          rules={[{ required: true, message: 'Please enter the repayment period' }]}
        >
          <InputNumber min={0} placeholder="Enter repayment period" className="w-full" />
        </Form.Item>

        <Form.Item
          name="purpose"
          label="Purpose"
          rules={[{ required: true, message: 'Please enter the purpose' }]}
        >
          <TextArea rows={3} placeholder="Enter purpose of the loan" />
        </Form.Item>

        <Form.Item
          name="documentsRequired"
          label="Documents Required"
          rules={[{ required: true, message: 'Please enter the documents required' }]}
        >
          <Select mode="tags" placeholder="Enter documents required">
            <Option value="ID Proof">ID Proof</Option>
            <Option value="Address Proof">Address Proof</Option>
            <Option value="Income Proof">Income Proof</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="eligiblePersons"
          label="Eligible Persons"
          rules={[{ required: true, message: 'Please enter the eligible persons' }]}
        >
          <Select mode="tags" placeholder="Enter eligible persons">
            <Option value="Salaried">Salaried</Option>
            <Option value="Self-employed">Self-employed</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="benefits"
          label="Benefits"
          rules={[{ required: true, message: 'Please enter the benefits' }]}
        >
          <Select mode="tags" placeholder="Enter benefits">
            <Option value="Low Interest Rate">Low Interest Rate</Option>
            <Option value="Flexible Repayment">Flexible Repayment</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="bankIcon"
          label="Bank Icon"
          rules={[{ required: true, message: 'Please upload the bank icon' }]}
        >
          <Upload
            name="bankIcon"
            listType="picture"
            fileList={fileList} // Set fileList state to be displayed
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload Bank Icon</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Bank
          </Button>
        </Form.Item>
        <Button type="default" onClick={handleViewBanks} className="w-full">
          View Banks
        </Button>
      </Form>
    </div>
  );
}

export default AddNewBank;
