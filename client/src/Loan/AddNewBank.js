import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AddNewBank = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList); // This will manage the file state correctly
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === 'bankIcon') {
        formData.append(key, values[key]?.file?.originFileObj); // Correctly append file to FormData
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/banks/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Bank added successfully!');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error('Failed to add bank. Please try again.');
    }
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
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Upload Bank Icon</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Bank
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewBank;
