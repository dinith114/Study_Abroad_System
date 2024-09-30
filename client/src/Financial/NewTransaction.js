import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, Typography, Card, message } from 'antd';
import moment from 'moment';
import 'antd/dist/reset.css'; // Import Ant Design styles
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NewTransaction = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    handleUpdate(values);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/financial/financials", values);
      console.log('Update response:', response.data);
      navigate('/ViewTransactions'); // Redirect after update
    } catch (error) {
      console.error("Error updating data:", error);
      message.error('Failed to submit data. Please try again.');
    }
  };

  // Function to disable past dates in the DatePicker
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400, padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <PageTitle title="New Transactions" />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: 'Please enter the amount!' },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (isNaN(value)) {
                    return Promise.reject('Amount must be a number.');
                  }
                  if (value <= 0) {
                    return Promise.reject('Amount must be greater than zero.');
                  }
                  if (value < 1 || value > 1000000) {
                    return Promise.reject('Amount must be between $1 and $1,000,000.');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input prefix="$" placeholder="Enter amount" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the type!' }]}
          >
            <Select placeholder="Select transaction type">
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ borderRadius: '5px' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewTransaction;
