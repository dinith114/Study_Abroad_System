import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd'; // Import Ant Design components
import PageTitle from '../Components/PageTitle';
import ServicesBanner from './ServicesBanner';
import safe from "../Images/safe.png";
import rate from "../Images/rate.png";
import easy from "../Images/easy.png";
import loan from "../Images/loan.jpg";
import emailjs from '@emailjs/browser';

function EducationLoan() {
  const [loading, setLoading] = useState(false);

  // Function to handle form submission and send email
  const onFinish = (values) => {
    setLoading(true); // Start loading animation
    
    // EmailJS parameters
    const serviceID = 'service_sgojxrq';
    const templateID = 'template_8eteqte';
    const userID = 'gqgwN25yZzv5oiipv';
    
    // Prepare email parameters from form values
    const emailParams = {
      fullname: values.fullname,
      email: values.email,
      mobile: values.mobile,
      message: values.message,
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, emailParams, userID)
      .then((response) => {
        setLoading(false); // Stop loading animation
        notification.success({
          message: 'Request Submitted',
          description: 'Your request has been submitted successfully and we have sent the details to our team.',
          duration: 3,
        });
      }, (error) => {
        setLoading(false); // Stop loading animation
        notification.error({
          message: 'Submission Failed',
          description: 'There was an error submitting your request. Please try again later.',
          duration: 3,
        });
      });
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Title Section */}
        <PageTitle title="Education Loan Support" />

        {/* Services Banner Section */}
        <ServicesBanner />

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <img src={easy} alt="Quick and Easy" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-lg font-semibold mb-2">Quick and easy</h3>
            <p className="text-gray-600">Find a bank for student loans in just a few simple clicks.</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 text-center">
            <img src={safe} alt="Safe and Reliable" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-lg font-semibold mb-2">Safe and reliable</h3>
            <p className="text-gray-600">Choose from a list of verified and reliable banks.</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 text-center">
            <img src={rate} alt="Lower Rates" className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-lg font-semibold mb-2">Lower Rates</h3>
            <p className="text-gray-600">Discover low-cost loans with no hidden charges.</p>
          </div>
        </div>

        {/* Loan Information Section */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <h2 className="text-4xl text-grNavTextHov font-bold mb-7">Student Education Loan</h2>
            <p className="mb-5 text-gray-700 leading-relaxed">
              Now, funding study abroad is simple as Global Reach helps students get education loans! 
              We work in collaboration with reputed financial institutions and help students get education 
              loans for fulfilling their study abroad dream.
            </p>
            <p className="mb-5 text-gray-700 leading-relaxed">
              The education loan covers primarily basic course fees and other expenses like accommodation, 
              examination charges, and additional miscellaneous charges.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For a loan application, you must be a Sri Lankan citizen and have taken admission into a 
              university or college acknowledged by the abroad college or university authority.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={loan} alt="Student Loan" className="rounded-lg shadow-lg w-full object-cover" />
          </div>
        </div>

        {/* Request Information Form using Ant Design */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Request Information</h2>
          <Form 
            name="request_info" 
            onFinish={onFinish} 
            layout="vertical" 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Form.Item
              name="fullname"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { pattern: /^[A-Za-z\s]+$/, message: 'Full name must only contain letters and spaces' },
                { min: 3, message: 'Full name must be at least 3 characters long' }
              ]}
            >
              <Input 
                placeholder="Full Name" 
                className="border-gray-300 p-3 rounded-md focus:outline-none" 
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="border-gray-300 p-3 rounded-md focus:outline-none" 
              />
            </Form.Item>

            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: 'Please enter your mobile number' },
                { pattern: /^0\d{9}$/, message: 'Mobile number must start with 0 and be exactly 10 digits' }
              ]}
            >
              <Input 
                type="tel" 
                placeholder="Mobile Number" 
                className="border-gray-300 p-3 rounded-md focus:outline-none" 
              />
            </Form.Item>

            <Form.Item
              name="message"
              rules={[
                { required: true, message: 'Please enter your message' },
                { min: 10, message: 'Message must be at least 10 characters long' }
              ]}
              className="col-span-2"
            >
              <Input.TextArea 
                placeholder="Message" 
                rows="3" 
                className="border-gray-300 p-3 rounded-md focus:outline-none" 
              />
            </Form.Item>

            <Form.Item className="col-span-2">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                className="bg-blue-500 w-full text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EducationLoan;
