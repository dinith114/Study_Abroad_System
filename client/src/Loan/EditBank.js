import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const EditBank = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/banks/view/${id}`)
      .then((response) => {
        const bank = response.data;
        setInitialData(bank);

        form.setFieldsValue({
          bankName: bank.bankName,
          interestRate: bank.interestRate,
          rank: bank.rank,
          maxLoan: bank.maxLoan,
          repaymentPeriod: bank.repaymentPeriod,
          purpose: bank.purpose,
          documentsRequired: bank.documentsRequired,
          eligiblePersons: bank.eligiblePersons,
          benefits: bank.benefits,
        });

        if (bank.bankIcon) {
          setFileList([{ url: bank.bankIcon }]);
        }
        setLoading(false);
      })
      .catch(() => {
        message.error('Failed to fetch bank data.');
        setLoading(false);
      });
  }, [id, form]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    // Check if a new file has been uploaded
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('bankIcon', fileList[0].originFileObj);
    } else {
      // If no new image, send the existing image URL or handle accordingly
      formData.append('bankIcon', initialData.bankIcon); // or remove this line if you don't want to send anything
    }

    Object.keys(values).forEach((key) => {
      if (key !== 'bankIcon') {
        formData.append(key, values[key]);
      }
    });

    try {
      await axios.put(`http://localhost:5000/banks/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Bank updated successfully!');
      navigate('/bank-list');
    } catch {
      message.error('Failed to update bank. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/bank-list');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Edit Bank Details</h2>

      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : initialData ? (
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

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="interestRate"
              label="Interest Rate (%)"
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
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="maxLoan"
              label="Max Loan Amount (Rs.)"
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
          </div>

          <Form.Item
            name="purpose"
            label="Loan Purpose"
            rules={[{ required: true, message: 'Please enter the loan purpose' }]}
          >
            <TextArea rows={3} placeholder="Enter purpose of the loan" />
          </Form.Item>

          <Form.Item
            name="documentsRequired"
            label="Documents Required"
            rules={[{ required: true, message: 'Please enter the required documents' }]}
          >
            <Select mode="tags" placeholder="Enter required documents">
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
            label="Bank Benefits"
            rules={[{ required: true, message: 'Please enter the bank benefits' }]}
          >
            <Select mode="tags" placeholder="Enter benefits">
              <Option value="Low Interest Rate">Low Interest Rate</Option>
              <Option value="Flexible Repayment">Flexible Repayment</Option>
            </Select>
          </Form.Item>

          <Form.Item name="bankIcon" label="Bank Icon">
            <Upload
              name="bankIcon"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Upload Bank Icon</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="flex justify-center space-x-4 items-center">
            <Button type="primary" htmlType="submit" className="flex-1 w-30 mx-10">
              Update Bank
            </Button>
            <Button type="default" onClick={handleCancel} className="flex-1 mx-10">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Failed to load bank data. Please refresh and try again.</p>
      )}
    </div>
  );
};

export default EditBank;
