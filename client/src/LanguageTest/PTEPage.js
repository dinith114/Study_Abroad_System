import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Form, Input, Select, Typography, Card, Row, Col, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
// import ieltsImage from '../Images/ielts2.png'; 
import IELTS from '../Images/IELTS1.jpg';

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background-color: #001529;
  width: 100%;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  align: center;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 10px;
`;

const FormSection = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const PackageSection = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const PTEPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/languagePrep/language-prep', values);
      if (response.status === 200 || response.status === 201) {
        console.log('Form data successfully submitted:', values);
        setFormData({
          name: '',
          age: '',
          email: '',
          phone: '',
          gender: '',
        });
        navigate("/RequestsTable");
      } else {
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <Container>
      <Header>
        <Title level={1} style={{ color: '#fff', margin: 0 }}>PTE</Title>
      </Header>
      <Content>
        <ImageSection>
          <Image src={IELTS} alt="IELTS Test Preparation" />
        </ImageSection>
        <Space direction="vertical" size="large">
          <Title level={2}>PTE Test Details</Title>
          <Paragraph>
            In PTE, there are four sections: Listening, Reading, Writing, and Speaking.
          </Paragraph>
          <Paragraph>
            There are two different PTE tests: Academic and General Training.
          </Paragraph>
          <Paragraph>
            The Speaking and Listening sections are the same in both tests, but the Reading and Writing sections are different.
          </Paragraph>
        </Space>

        <FormSection>
          <Card title="Evaluation Test Registration" bordered={false} style={{ marginTop: 30 }}>
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={formData}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please enter your age' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mobile Number"
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: 'Phone number must be exactly 10 digits and contain only numbers',
                  },
                ]}
              >
              
                <Input   maxLength={10}/>
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select your gender' }]}
              >
                <Select placeholder="Select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </FormSection>

        <PackageSection>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card
                title="IELTS Beginners"
                bordered={false}
                style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center' }}
              >
                Includes Books, Video, and Tutorial
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                title="IELTS Advanced"
                bordered={false}
                style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center' }}
              >
                Includes Books, Video, and Tutorial
              </Card>
            </Col>
          </Row>
        </PackageSection>
      </Content>
    </Container>
  );
};

export default PTEPage;
