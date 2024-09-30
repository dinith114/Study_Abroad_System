import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Modal, Form, Input, Button, DatePicker, notification } from 'antd';
import { FaUser, FaEnvelope, FaCalendarAlt, FaComment, FaPhone } from 'react-icons/fa';
import emailjs from '@emailjs/browser'; // Import EmailJS
import banner1 from '../Images/banner6.webp';
import banner2 from '../Images/banner2.webp';
import banner3 from '../Images/banner3.webp';
import banner4 from '../Images/banner4.webp';
import moment from 'moment';

function ImageSlider() {
  const slides = [
    {
      image: banner1,
      title: 'Explore Your Future',
      subtitle: 'Study Abroad with Ease',
      button1: 'Contact Us',
      button2: 'Reserve',
    },
    {
      image: banner2,
      title: 'Achieve Your Dreams',
      subtitle: 'Find the Best Universities',
      button1: 'Contact Us',
      button2: 'Reserve',
    },
    {
      image: banner3,
      title: 'Global Opportunities',
      subtitle: 'Start Your Journey Today',
      button1: 'Contact Us',
      button2: 'Reserve',
    },
    {
      image: banner4,
      title: 'Make it Happen',
      subtitle: 'Get Admission in Top Universities',
      button1: 'Contact Us',
      button2: 'Reserve',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Auto change image every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const handlePrevious = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const today = moment().format('YYYY-MM-DD');

  const onFinish = async (values) => {
    setLoading(true);

    try {
      await emailjs.send('service_sgojxrq', 'template_8eteqte', {
        today:today,
        fullname: values.fullname,
        email: values.email,
        mobile: values.mobile,
        date: values.date.format('YYYY-MM-DD'),
        message: values.message || 'No message provided',
      }, 'gqgwN25yZzv5oiipv');

      notification.success({
        message: 'Reservation Submitted',
        description: 'Your reservation has been successfully submitted!',
        placement: 'topRight',
      });
    } catch (error) {
      notification.error({
        message: 'Submission Failed',
        description: 'There was an error submitting your reservation. Please try again later.',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
      closeModal(); // Close modal after submission
    }
  };

  const validateDate = (date) => {
    if (!date) return Promise.reject('Please choose a date');
    const today = moment().startOf('day'); // Start of today
    if (date.isBefore(today)) {
      return Promise.reject('Date must be a future date');
    }
    return Promise.resolve();
  };

  return (
    <div className="relative">
      <div className="h-[400px] w-full overflow-hidden relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-1000 ease-in-out w-full h-full ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center pl-28">
              {index === current && (
                <motion.h1
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-4xl text-black font-bold mb-2"
                >
                  {slide.title}
                </motion.h1>
              )}
              {index === current && (
                <motion.p
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-lg text-grNavTextHov mb-4"
                >
                  {slide.subtitle}
                </motion.p>
              )}
              <div>
                {index === current && (
                  <>
                    <motion.button
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded mr-2 transition-all duration-300"
                    >
                      {slide.button1}
                    </motion.button>
                    <motion.button
                      onClick={openModal} // Open modal on click
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                    >
                      {slide.button2}
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-300"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition duration-300"
      >
        ›
      </button>
      <div className="absolute bottom-5 w-full flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-500 ${
              current === index ? 'bg-blue-600' : 'bg-gray-500'
            }`}
          ></button>
        ))}
      </div>

      {/* Reservation Modal */}
      <Modal
        title="Reserve a Time"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null} // No default footer
        centered
      >
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

          {/* Mobile Number */}
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please enter your mobile number' },
              { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' },
            ]}
          >
            <Input 
              prefix={<FaPhone className="text-gray-400" />} // Icon
              placeholder="Your Mobile Number" 
              className="border-gray-300 p-3 rounded-md focus:border-blue-500 transition duration-200"
            />
          </Form.Item>

          {/* Reservation Date */}
          <Form.Item
            name="date"
            label="Reservation Date"
            rules={[{ validator: (_, value) => validateDate(value) }]}
          >
            <DatePicker 
              className="w-full border-gray-300 p-3 rounded-md focus:border-blue-500 transition duration-200"
              prefix={<FaCalendarAlt className="text-gray-400" />}
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
      </Modal>
    </div>
  );
}

export default ImageSlider;
