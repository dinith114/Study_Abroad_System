import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, notification } from 'antd';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaCalendarAlt, FaComment } from 'react-icons/fa';

function ReservationForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Define the EmailJS service and template IDs
    const serviceID = 'your_service_id'; // Replace with your EmailJS service ID
    const templateID = 'your_template_id'; // Replace with your EmailJS template ID
    const userID = 'your_user_id'; // Replace with your EmailJS user ID

    // Send the email via EmailJS
    emailjs
      .send(serviceID, templateID, values, userID)
      .then((response) => {
        setLoading(false);
        // Show success notification
        notification.success({
          message: 'Reservation Submitted',
          description: 'Your reservation has been successfully submitted!',
          placement: 'topRight',
        });
      })
      .catch((error) => {
        setLoading(false);
        // Show error notification
        notification.error({
          message: 'Submission Failed',
          description: 'There was an error submitting your reservation. Please try again.',
          placement: 'topRight',
        });
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto my-12 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reserve a Time</h2>

      {/* Ant Design Form */}
      <Form
        name="reservation_form"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        {/* Full Name */}
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            { required: true, message: 'Please enter your full name' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Name should only contain letters and spaces' },
            { min: 3, message: 'Full name must be at least 3 characters long' },
          ]}
        >
          <Input 
            prefix={<FaUser className="text-gray-400" />} // Icon
            placeholder="Your Full Name" 
            className="border-gray-300 p-3 rounded-md focus:border-blue-500 transition duration-200"
          />
        </Form.Item>

        {/* Email Address */}
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input 
            prefix={<FaEnvelope className="text-gray-400" />} // Icon
            type="email" 
            placeholder="Your Email Address" 
            className="border-gray-300 p-3 rounded-md focus:border-blue-500 transition duration-200"
          />
        </Form.Item>

        {/* Reservation Date */}
        <Form.Item
          name="date"
          label="Reservation Date"
          rules={[{ required: true, message: 'Please choose a date' }]}
        >
          <DatePicker 
            className="w-full border-gray-300 p-3 rounded-md focus:border-blue-500 transition duration-200"
            prefix={<FaCalendarAlt className="text-gray-400" />} // Icon
          />
        </Form.Item>

        {/* Message (Optional) */}
        <Form.Item
          name="message"
          label="Message (Optional)"
          className="col-span-2"
        >
          <Input.TextArea 
            prefix={<FaComment className="text-gray-400" />} // Icon
            placeholder="Your message (optional)" 
            rows={4} 
            className="border-gray-300 p-3 rounded-md focus:border-blue-500 transition duration-200"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            {loading ? "Submitting..." : "Reserve Now"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ReservationForm;
