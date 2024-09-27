import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import axios from 'axios'; // Import Axios
import feedback from "../Images/feedback.jpg"

const { Title, Paragraph } = Typography;

const FeedbackForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Received values: ', values);
        try {
            // Replace `your-api-endpoint` with your actual API endpoint
            const response = await axios.post('http://localhost:5000/feedback/feedbacks', values);
            console.log('Response from server: ', response.data);
            form.resetFields(); 
            // Reset the form fields after successful submission
            navigate(`/MyFeedback?id=${response.data._id}`);
            // Optionally, display a success message or redirect the user
        } catch (error) {
            console.error('Error submitting feedback: ', error);
            // Optionally, display an error message
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
                <Title level={2} style={{ color: '#1890ff' }}>We Value Your Feedback</Title>
                <Paragraph style={{ fontSize: '16px', color: '#555555' }}>
                    Your feedback is important to us. Please take a moment to share your thoughts and suggestions so we can continue to improve our services. 
                    We appreciate your time and effort in helping us serve you better.
                </Paragraph>
            </div>

            <Row justify="center" align="middle" gutter={[16, 16]}>
                {/* Left Column for Image */}
                <Col xs={24} md={14} lg={12}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={feedback} // replace with your image path
                            alt="Feedback Illustration"
                            style={{ width: '100%', height: 'auto', maxHeight: '400px' }} // Ensure the image stays large
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

export default FeedbackForm;
