import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, DatePicker, Select, Typography, Card } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import moment from 'moment';
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EditTransaction = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Parse the query parameters
  const record = queryParams.get('record'); // Get the record ID from the query params

  useEffect(() => {
    viewData();
  }, []);

  const viewData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/financial/viewOnefinancials/${record}`);
      const retrievOneFinaicial = response.data;
      console.log("Fetched Data:", retrievOneFinaicial);

      // Check if the data keys match the form item names
      form.setFieldsValue({
        date: moment(retrievOneFinaicial.date), // Convert string date to moment object
        amount: retrievOneFinaicial.amount,
        type: retrievOneFinaicial.type.toLowerCase(), // Ensure the type matches the options' values
        description: retrievOneFinaicial.description,
      });
      console.log("Form Values Set:", form.getFieldsValue()); // Debugging step to ensure values are set
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onFinish = (values) => {
    handleUpdate(values);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/financial/editfinancials/${record}`, values);
      console.log('Update response:', response.data);
      navigate('/ViewTransactions'); // Redirect after update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400, padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <PageTitle title="Edit Transactions" />
        <Form
          layout="vertical"
          form={form} // Bind the form instance to the Form component
          onFinish={onFinish}
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter the amount!' }]}
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditTransaction;
