import React, { useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Button } from 'antd';
import { Segment } from 'semantic-ui-react';

const Chatbot = ({ isOpen, onClose }) => {

  useEffect(() => {
    console.log('Chatbot Component Rendered');
  }, [isOpen]);

  const steps = [
    {
      id: 'Great',
      message: 'Hello, welcome to Global Reach!',
      trigger: 'Ask Name',
    },
    {
      id: 'Ask Name',
      message: 'Please enter your name',
      trigger: 'waiting1',
    },
    {
      id: 'waiting1',
      user: true,
      trigger: 'Name',
    },
    {
      id: 'Name',
      message: 'Hi {previousValue}, please select what you want to know.',
      trigger: 'issues',
    },
    {
      id: 'issues',
      options: [
        { value: 'Services', label: 'Services', trigger: 'Services' },
        { value: 'Contact Details', label: 'Contact Details', trigger: 'Contact' },
        { value: 'Paid Services', label: 'Are these services paid?', trigger: 'PaidServices' },
        { value: 'Scholarships', label: 'Does the company help to find scholarships?', trigger: 'Scholarships' },
      ],
    },
    {
      id: 'Services',
      message: 'We offer the following services: student counseling, financial counseling, document managing, quick visa, and professional communication.',
      trigger: 'AnythingElse',
    },
    {
      id: 'Contact',
      message: 'Here are our contact details: 12 Schofield Pl, Colombo 00300\nEmail: globalreachcolombo@gmail.com\nPhone: +94 77-222-4700',
      trigger: 'AnythingElse',
    },
    {
      id: 'PaidServices',
      message: 'No, these services are not paid.',
      trigger: 'AnythingElse',
    },
    {
      id: 'Scholarships',
      message: 'Yes, we help to find scholarships.',
      trigger: 'AnythingElse',
    },
    {
      id: 'AnythingElse',
      message: 'Is there anything else you would like to know?',
      trigger: 'issues',
    },
  ];

  return (
    <>
      {isOpen && (
        <Segment floated="right">
          <ChatBot
            steps={steps}
            key={isOpen ? 'open' : 'closed'} // Debugging by isolating instances
            handleEnd={({ steps, values }) => console.log('Chatbot interaction ended')}
          />
          <Button onClick={onClose} style={{ marginTop: '10px' }}>
            Close Chat
          </Button>
        </Segment>
      )}
    </>
  );
};

export default Chatbot;
