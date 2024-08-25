import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Checkbox, Upload, message, Row, Col, Divider } from 'antd';
import { UploadOutlined, PlusOutlined, SaveOutlined, DeleteOutlined, CloseOutlined} from '@ant-design/icons';
import PageTitle from '../Components/PageTitle';
import FormItem from 'antd/es/form/FormItem';
/*import { AiOutlineCloudUpload, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';*/

const { Option } = Select;

function EditStudent() {
  const [form] = Form.useForm();
  const [age, setAge] = useState(null);

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
    console.log('Received values:', values);
  }

  // Handle image upload
  function onUpload(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  // Function to validate NIC number
  function validateNic(_, value) {
    const nicPattern = /^(?:\d{12}|\d{9}[Vv])$/;
    if (nicPattern.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('NIC must be 12 digits or 9 digits followed by V or v'));
    }
  }

  const handleCancel = () => {
    // Logic for cancel action
  };

  const handleSave = () => {
    // Logic for save changes
  };

  const handleDelete = () => {
    // Logic for delete action
  };


  return (
    <div>
      {/* Page Title */}
      <PageTitle title="Edit Student Details" />

      <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
        <Form
          form={form}
          name="student_registration"
          onFinish={onFinish}
          layout="vertical"

          style={{background: "#f5f5f5",
            padding: "40px",
            borderRadius: "10px",
            position: "relative", 
            /*width: '800px', margin: 'auto'*/}}
        >
          
          <Row gutter={150}>
          <Col span={16}>
            {/* Personal Information Section */}
            <Form.Item label={<b>Full Name</b>} name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
              <Input placeholder="Enter full name" 
               defaultValue="Full Name" /*Set default value*/ />
            </Form.Item>

            <Form.Item label={<b>First Name</b>} name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
              <Input placeholder="Enter first name" 
                defaultValue="First Name"/>
            </Form.Item>

            <Form.Item label={<b>Last Name</b>} name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
              <Input placeholder="Enter last name"
                defaultValue="Last Name"/>
            </Form.Item>

            <Row gutter={30}>
              <Col span={12}>
                <Form.Item label={<b>Date of Birth</b>} name="dob" rules={[{ required: true, message: 'Please select your date of birth' }]}>
                    <DatePicker style={{ width: '100%' }} onChange={handleDobChange} defaultValue={null} />
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
              <Select placeholder="Select gender" defaultValue={'female'}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                {/*<Option value="other">Other</Option>*/}
              </Select>
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input placeholder="Enter email" defaultValue={'jaya123@gmail.com'}/>
            </Form.Item>

            <Form.Item label="Mobile Phone" name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <Input placeholder="Enter mobile phone number" defaultValue={'0773456310'} />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input placeholder="Enter address" defaultValue={'101, Temple Road, Maharagama'}/>
            </Form.Item>
          </Col>

          <div style={{marginTop: '110px'}} >
            <Col span={8}>
            {/* Upload Image Section */}
            <Form.Item name="upload" valuePropName="fileList">
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                onChange={onUpload}
                action="/upload.do"
              >
                    <div
                    style={{
                      width: '200px',  // Outer square width
                      height: '200px',  // Outer square height
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f0',  // Optional background color for the square
                    }}
                  >
                    <Button
                      style={{ width: '80%' }}  // Button width as a percentage of the inner square
                      icon={<UploadOutlined />}
                    >
                      Choose Image
                    </Button>
                  </div>
                </Upload>
              </Form.Item>
              <div style={{ textAlign: 'center', marginTop:'60px' }}>Upload an Image</div>
            </Col>
            </div>
          </Row>
          
          <Divider orientation="center" style={{borderColor: 'black'}}>Education Level</Divider>

          {/* Education Level Section */}
          <Form.Item label={<b>Currently Completed</b>} name="educationLevel">
            <Checkbox.Group>
              <Checkbox defaultChecked value="oLevel">GCE(O/L)</Checkbox>
              <Checkbox defaultChecked value="aLevel">GCE(A/L)</Checkbox>
              <Checkbox value="diploma">Diploma</Checkbox>
              <Checkbox value="bachelors">Bachelors</Checkbox>
              <Checkbox value="masters">Masters</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label={<b>Other Qualifications</b>} name="otherQualifications">
            <Input.TextArea placeholder="Enter other educational details" rows={4} />
          </Form.Item>

          <Form.Item label={<b>IELTS/PTE Exam Status</b>} name="examStatus">
            <Select placeholder="Select exam status" defaultValue={'completed'}>
              <Option value="completed">Completed</Option>
              <Option value="notCompleted">Not Completed</Option>
            </Select>
          </Form.Item>

          <Divider orientation="center" style={{borderColor: 'black'}}>Financial Status</Divider>

          {/* Financial Status Section */}
          <Form.Item label="Income Level of Student" name="incomeLevel">
            <Select placeholder="Select income level" defaultValue={'medium'}>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Financial Sponsor Type" name="sponsorType">
            <Select placeholder="Select sponsor type" defaultValue={'parents'}>
                <Option value="self">Self Sponsored</Option>
                <Option value="parent">Parents</Option>
                <Option value="sibling">Sibling</Option>
                <Option value="other">Other</Option>
            </Select>
        </Form.Item>

        <Divider orientation="center" style={{borderColor: 'black'}}>Study Preferences</Divider>

          {/* Study Preferences Section */}
        <Form.Item label="Preferred Course/Subject with Specialization" name="preferredCourse">
            <Select placeholder="Enter preferred course or subject" defaultValue={'s&t'}>
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

          <Form.Item label="Preferred Country" name="preferredCountry">
            <Select placeholder="Select country" defaultValue={'newZealand'}> 
              <Option value="none">None</Option>
              <Option value="australia">Australia</Option>
              <Option value="canada">Canada</Option>
              <Option value="newZeland">NewZealand</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Preferred University (if any)" name="preferredUniversity">
            <Input placeholder="Enter preferred university" />
          </Form.Item>

          {/* Submit Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <Button
              type="default"
              style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
              icon={<PlusOutlined />}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save Changes
            </Button>
            <Button
              type="default" // Set button type to default for grey color
              style={{ backgroundColor: "#d3d3d3", color: "#000" }} // Grey color
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button 
      onClick={handleCancel} 
      type="default" 
      icon={<CloseOutlined />} 
      style={{
        backgroundColor: '#6b7280', // gray-500 equivalent
        color: '#fff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Cancel
    </Button>
          </div>
      
        </Form>
      </div>
    </div>
  );
}

export default EditStudent;


