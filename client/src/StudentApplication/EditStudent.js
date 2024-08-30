import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, Checkbox, Upload, message, Row, Col, Divider, Layout } from 'antd';
import { UploadOutlined, PlusOutlined, SaveOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import PageTitle from '../Components/PageTitle';
import axios from 'axios';
import moment from 'moment';
import SideMenuBar from '../Components/SideMenuBar';

const { Option } = Select;
const { Content } = Layout;

function EditStudent() {
  const [form] = Form.useForm();
  const [age, setAge] = useState(null);
  const [avatar,setAvatar] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const record = queryParams.get('id');
  console.log("id",record)

  useEffect(() => {
      viewStudentApplication();
    }, []);

  const viewStudentApplication = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/studentapp/viewOneStudentApplicationEdit/${record}`);
      const retrievOneStudent = response.data;
      console.log("retrievOneStudent",retrievOneStudent)

      form.setFieldsValue({
        //date: date, // Set the date directly
        studentFullName: retrievOneStudent.studentFullName,
        //type: retrievOneStudent.type.toLowerCase(),
        studentFirstName: retrievOneStudent.studentFirstName,
        studentLastName: retrievOneStudent.studentLastName,
        studentDob: retrievOneStudent.studentDob ? moment(retrievOneStudent.studentDob) : null,
        age: retrievOneStudent.age,
        nic: retrievOneStudent.nic,
        gender: retrievOneStudent.gender,
        email: retrievOneStudent.email,
        phoneNumber: retrievOneStudent.phoneNumber,
        address: retrievOneStudent.address,
        profileImage:retrievOneStudent.profileImage,
        currentlyCompleted: retrievOneStudent.currentlyCompleted,
        otherQualifications: retrievOneStudent.otherQualifications,
        ieltsStatus: retrievOneStudent.ieltsStatus,
        incomeLevel: retrievOneStudent.incomeLevel,
        financeSType: retrievOneStudent.financeSType,
        preferCourse: retrievOneStudent.preferCourse,
        preferCountry: retrievOneStudent.preferCountry,
        preferUniversity: retrievOneStudent.preferUniversity,
      }); 
    //jjjnight  console.log("Form Values Set:", form.getFieldsValue());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (values) => {
    try {
        // Separate the file upload from the rest of the form data
        let formData = new FormData();
        if (avatar) {
            formData.append('profileImage', avatar);
        }

        // Append other form values to FormData (convert non-File data to JSON)
        const otherValues = { ...values };
        delete otherValues.profileImage; // Remove the profileImage from values as it's handled separately

        formData.append('data', JSON.stringify(otherValues));

        let res = await axios.put(`http://localhost:5000/studentapp/editStudentApplication/${record}`, formData, {
            headers: {
                'Content-Type':[ 'multipart/form-data', 'application/json']
            },
        });

        console.log("res", res);
        message.success("Student data updated successfully.");
        navigate('/studentList');
    } catch (error) {
        console.error("Error updating data:", error);
        message.error("Failed to update student data.");
    }
};
  const handleDobChange = (date) => {
    if (date) {
      const today = new Date();
      const birthDate = new Date(date);
      let currentAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        currentAge--;
      }
      setAge(currentAge);
      form.setFieldsValue({ age: currentAge });
    } else {
      setAge(null);
      form.setFieldsValue({ age: '' });
    }
  };

  const onFinish = (values) => {
    handleUpdate(values);
  };

  /* const onUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }; */

  const validateNic = (_, value) => {
    const nicPattern = /^(?:\d{12}|\d{9}[Vv])$/;
    if (nicPattern.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('NIC must be 12 digits or 9 digits followed by V or v'));
    }
  };

  const handleCancel = () => {
    // Logic for cancel action
    navigate("/studentList");
  };

  const handleSave = () => {
    // Logic for save changes
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/studentapp/removeStudentApplication/${record}`);
      navigate("/studentList"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenuBar />  {/* Your side menu component */}
     
    <Layout>
    <Content style={{ padding: '10px' }}>
     <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto", marginLeft: '350px'}}>
        <Form
          form={form}
          name="student_registration"
          onFinish={onFinish}
          layout="vertical"
          style={{
            background: "#f5f5f5",
            padding: "40px",
            borderRadius: "10px",
            position: "relative",
            border: "1px solid #d9d9d9", // Light gray border
            boxShadow: "0 4px 8px #C0C0C0", // Soft shadow
          }}
        >
        <PageTitle title="Edit Student Details" />
        
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item label={<b>Full Name</b>} name="studentFullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>

              <Form.Item label={<b>First Name</b>} name="studentFirstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input placeholder="Enter first name" />
              </Form.Item>

              <Form.Item label={<b>Last Name</b>} name="studentLastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input placeholder="Enter last name" />
              </Form.Item>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label={<b>Date of Birth</b>} name="studentDob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
                    <DatePicker style={{ width: '100%' }} onChange={handleDobChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<b>Age</b>} name="age">
                    <Input value={age} readOnly placeholder="Age will be auto-calculated" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="NIC" name="nic"
                rules={[
                  {
                    required: true,
                    message: 'Please input your NIC number!',
                  },
                  {
                    validator: validateNic,
                  },
                ]}
              >
                <Input placeholder="Enter NIC number" />
              </Form.Item>

              <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item label="Mobile Phone" name="phoneNumber" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input placeholder="Enter mobile phone number" />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="profileImage" valuePropName="fileList">
                <div
                  style={{
                  width: '200px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f0f0f0',
                  flexDirection: 'column',
                  margin: 'auto',
                  marginTop: '80px',
                  }}
                >
                
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log("Selected file:", e.target); // Log the selected file
                    setAvatar(file); // Update the state with the selected file
                  }}
                  style={{ display: 'none' }} // Hide the input
                />

                <Button
                  style={{ width: '80%' }}  // Button width as a percentage of the inner square
                  icon={<UploadOutlined />}
                  onClick={() => document.getElementById('avatar').click()} // Trigger file input click
                >
                Choose Image
                </Button>
              </div>
                  {/* </Upload> */}
              </Form.Item>
              <div style={{ textAlign: 'center', marginTop:'5px', fontWeight:'bold' }}>Upload an Image</div>
            </Col>
          </Row>

          <Divider orientation="center" style={{ borderColor: 'black' }}>Education Level</Divider>

          <Form.Item label={<b>Currently Completed</b>} name="currentlyCompleted">
            <Checkbox.Group>
              <Checkbox value="A Level">A Level</Checkbox>
              <Checkbox value="O Level">O Level</Checkbox>
              <Checkbox value="Undergraduate">Undergraduate</Checkbox>
              <Checkbox value="Postgraduate">Postgraduate</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Other Qualifications" name="otherQualifications">
            <Input.TextArea placeholder="Enter other educational details" rows={4} />
          </Form.Item>

          <Form.Item label="IELTS/PTE Exam Status" name="ieltsStatus">
            <Select placeholder="Select exam status">
              <Option value="completed">Completed</Option>
              <Option value="notCompleted">Not Completed</Option>
            </Select>
          </Form.Item>

          <Divider orientation="center" style={{borderColor: 'black'}}>Financial Status</Divider>

          {/* Financial Status Section */}
          <Form.Item label="Income Level of Student" name="incomeLevel">
            <Select placeholder="Select income level">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Financial Sponsor Type" name="financeSType">
            <Select placeholder="Select sponsor type">
              <Option value="self">Self Sponsored</Option>
              <Option value="parent">Parents</Option>
              <Option value="sibling">Sibling</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Divider orientation="center" style={{borderColor: 'black'}}>Study Preferences</Divider>

          {/* Study Preferences Section */}
          <Form.Item label="Preferred Course/Subject with Specialization" name="preferCourse">
          <Select placeholder="Enter preferred course or subject">
            <Option value="s&t">Science and Technology</Option>
                <Option value="m&h">Medicine and Health</Option>
                <Option value="b&m">Business and Management</Option>
                <Option value="e&t">Engineering and Technology</Option>
                <Option value="art">Art</Option>
                <Option value="h&ss">Humanities and Social Science</Option>
                <Option value="law">Law</Option>
                <option value="education">Education</option>
            </Select>
          </Form.Item>

          <Form.Item label="Preferred Country" name="preferCountry">
            <Select placeholder="Select country">
              <Option value="none">None</Option>
              <Option value="australia">Australia</Option>
              <Option value="canada">Canada</Option>
              <Option value="newZeland">NewZealand</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Preferred University (if any)" name="preferUniversity">
            <Input placeholder="Enter preferred university" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ marginRight: '10px' }}>
              Save Changes
            </Button>
            <Button type="default" onClick={handleCancel} icon={<CloseOutlined />} style={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button type="danger" onClick={handleDelete} icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Form.Item>
        </Form>
      </div>
      </Content>
    </Layout>
      </Layout>
  );
}

export default EditStudent;
