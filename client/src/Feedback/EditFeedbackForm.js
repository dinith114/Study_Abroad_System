import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import feedback from "../Images/feedback.jpg";
import PageTitle from '../Components/PageTitle';

const { Title, Paragraph } = Typography;

const EditFeedbackForm = () => {
  const [form] = Form.useForm();
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Parse the query parameters
  const id = queryParams.get('id');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    viewFeedbackData();
  }, [id]);

  const viewFeedbackData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/feedback/feedbacks/${id}`);
      console.log("Fetched feedback:", response.data);
      form.setFieldsValue(response.data); // Set the fetched data into the form fields
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const onFinish = async (values) => {
    console.log('Updated values: ', values);
    try {
      let res = await axios.put(`http://localhost:5000/feedback/editfeedbacks/${id}`, values);
      console.log("res", res.data)
      console.log('Feedback updated successfully');
      navigate('/ViewFeedback'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating feedback:', error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const validateNameOrSurname = (_, value) => {
    if (value && /\d/.test(value)) {
      return Promise.reject('Name and Surname cannot contain numbers');
    }
    return Promise.resolve();
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      {/* Intro Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <PageTitle title="Edit Feedback" />
        <Paragraph style={{ fontSize: '16px', color: '#555555' }}>
          Modify the feedback details below and click "Done" to save the changes.
        </Paragraph>
      </div>

      <Row justify="center" align="middle" gutter={[16, 16]}>
        {/* Left Column for Image */}
        <Col xs={24} md={14} lg={12}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={feedback}
              alt="Feedback Illustration"
              style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
            />
          </div>
        </Col>

        {/* Right Column for Form */}
        <Col xs={24} md={10} lg={8}>
          <div style={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item 
                label="Name" 
                name="name" 
                rules={[
                  { required: true, message: 'Please enter your name' },
                  { validator: validateNameOrSurname }
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item 
                label="Surname" 
                name="surname" 
                rules={[
                  { required: true, message: 'Please enter your surname' },
                  { validator: validateNameOrSurname }
                ]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
              <Form.Item 
                label="Email" 
                name="email" 
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item 
                label="Your Feedback" 
                name="description" 
                rules={[{ required: true, message: 'Please enter your feedback' }]}
              >
                <Input.TextArea placeholder="Your Feedback" rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Done
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditFeedbackForm;
