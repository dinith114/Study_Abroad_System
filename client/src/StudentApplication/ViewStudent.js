import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Spin, Layout } from 'antd';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

function ViewStudent() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
  console.log("id",id)
  
  // Get student ID from URL params
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/studentapp/viewOneStudentApplicationEdit/${id}`);
      console.log("bbbb",response.data)
      setStudent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!student) {
    return <p>No student data found</p>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '10px' }}>
        <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto', background: '#f5f5f5', borderRadius: '10px', border: '1px solid #d9d9d9' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Student Details</h2>
          <Descriptions bordered size="middle" column={2}>
            <Descriptions.Item label="Full Name">{student.studentFullName}</Descriptions.Item>
            <Descriptions.Item label="First Name">{student.studentFirstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{student.studentLastName}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{new Date(student.studentDob).toLocaleDateString()}</Descriptions.Item>
            <Descriptions.Item label="Age">{student.age}</Descriptions.Item>
            <Descriptions.Item label="NIC">{student.nic}</Descriptions.Item>
            <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
            <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile">{student.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Address">{student.address}</Descriptions.Item>
            <Descriptions.Item label="Currently Completed">{student.currentlyCompleted}</Descriptions.Item>
            <Descriptions.Item label="Other Qualifications">{student.otherQualifications}</Descriptions.Item>
            <Descriptions.Item label="IELTS Status">{student.ieltsStatus}</Descriptions.Item>
            <Descriptions.Item label="Income Level">{student.incomeLevel}</Descriptions.Item>
            <Descriptions.Item label="Sponsor Type">{student.financeSType}</Descriptions.Item>
            <Descriptions.Item label="Preferred Course">{student.preferCourse}</Descriptions.Item>
            <Descriptions.Item label="Preferred Country">{student.preferCountry}</Descriptions.Item>
            <Descriptions.Item label="Preferred University">{student.preferUniversity}</Descriptions.Item>
          </Descriptions>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button type="primary" onClick={() => navigate('/studentList')}>Back to Student List</Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default ViewStudent;
