import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, Checkbox, Row, Col, Divider, Layout} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PageTitle from '../Components/PageTitle';
import SideMenuBar from '../Components/SideMenuBar';  // Adjust the path based on your file structure

const { Option } = Select;
const { Sider, Content } = Layout;

function StudentRegistrationForm() {
  const [form] = Form.useForm();
  const [age, setAge] = useState(null);
  const [avatar,setAvatar] = useState(null)
  const navigate = useNavigate();

  // Handle Date of Birth change and calculate age
  function handleDobChange(date) {
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
  }

  // Handle form submission
  function onFinish(values) {
    console.log("hiiii")
    console.log('Received values:', values);
    const formData = new FormData();
    // Append normal form fields
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key])); // Convert array to JSON string
      } else {
        formData.append(key, values[key]);
      }
    });

    // Append file for cover picture
    if (avatar) {
      formData.append("profileImage", avatar);
    }
    handleApplicationSubmit(formData);
}


  // Handle image upload
  // function onUpload(info) {
  //   if (info.file.status === 'done') {
  //     message.success(${info.file.name} file uploaded successfully);
  //   } else if (info.file.status === 'error') {
  //     message.error(${info.file.name} file upload failed.);
  //   }
  // }

  // Function to validate NIC number
  function validateNic(_, value) {
    const nicPattern = /^(?:\d{12}|\d{9}[Vv])$/;
    if (nicPattern.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('NIC must be 12 digits or 9 digits followed by V or v'));
    }
  }



  const handleApplicationSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/studentapp/createStudentApplication", values);
      console.log('Update response:', response.data);
      navigate('/ViewStudentApplication'); // Redirect after update
    } catch (error) {
      console.error("Error updating data:", error);
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
        style={{background: "#f5f5f5",
        padding: "40px",
        borderRadius: "10px",
        position: "relative",
        border: "1px solid #d9d9d9", // Light gray border
        boxShadow: "0 4px 8px #C0C0C0", // Soft shadow
            /*width: '800px', margin: 'auto'*/}}
      >
      <PageTitle title="Student Application Form" />
      <Row gutter={24}>
        <Col span={16}>
            {/* Personal Information Section */}
          <Form.Item label={<b>Full Name</b>} name="studentFullName" rules={[{ required: true, message: 'Please enter your full name' },
          {
            pattern: /^[A-Za-z\s]+$/,
            message: 'Full name can only contain letters and spaces',
          },
          ]}>
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item label={<b>First Name</b>} name="studentFirstName" rules={[{ required: true, message: 'Please enter your first name' },
          {
            pattern: /^[A-Za-z\s]+$/,
            message: 'Full name can only contain letters and spaces',
          },
          ]}>
            <Input placeholder="Enter first name" />
          </Form.Item>

            <Form.Item label={<b>Last Name</b>} name="studentLastName" rules={[{ required: true, message: 'Please enter your last name' },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Full name can only contain letters and spaces',
              },
            ]}>
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

            <Form.Item label={<b>NIC</b>} name="nic"
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
                {/*<Option value="other">Other</Option>*/}
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

         {/* <div style={{marginTop: '110px'}} > */}
            <Col span={8}>
            {/* Upload Image Section */}
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
           {/*  </div> */}
          </Row>
          
          <Divider orientation="center" style={{borderColor: 'black'}}>Education Level</Divider>

          {/* Education Level Section */}
          <Form.Item label="Currently Completed" name="currentlyCompleted">
            <Checkbox.Group>
              <Checkbox value="oLevel">GCE(O/L)</Checkbox>
              <Checkbox value="aLevel">GCE(A/L)</Checkbox>
              <Checkbox value="diploma">Diploma</Checkbox>
              <Checkbox value="bachelors">Bachelors</Checkbox>
              <Checkbox value="masters">Masters</Checkbox>
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

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      </Content>
      </Layout>
      </Layout>
  );
}

export default StudentRegistrationForm;
