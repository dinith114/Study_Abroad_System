import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Input } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTitle from '../Components/PageTitle';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ViewOneFeedback = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { feedback } = location.state || {}; // Retrieve feedback data from the state passed in navigation

  const [isReply, setIsReply] = useState('');
  const [showReplyField, setShowReplyField] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const [isField, setIsField] = useState("");

  const queryParams = new URLSearchParams(location.search); // Parse the query parameters
  const id = queryParams.get('id'); 

  useEffect(() => {
    ViewFeedback();
  }, [id]);

  const ViewFeedback = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/feedback/feedbacks/${id}`);
      setFeedbackData(res.data);
      setIsReply(res.data.adminReply || ''); // Load the existing reply if it exists
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleReply = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/feedback/feedbacks/${id}/reply`, { adminReply: isReply });
      console.log(res.data); // Verify the response data
      
      setFeedbackData((prevData) => ({
        ...prevData,
        adminReply: res.data.adminReply,
      }));
      
      setShowReplyField(false);
    } catch (error) {
      console.error('Error saving reply:', error);
    }
  };
  return (
    <div style={{ padding: '50px' }}>
       <PageTitle title="FeedBack Details" />
      <Card
        bordered={false}
        style={{
          maxWidth: '600px',
          margin: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>
          <Text strong>Name:</Text> {feedbackData.name}
        </p>
        <p>
          <Text strong>Surname:</Text> {feedbackData.surname}
        </p>
        <p>
          <Text strong>Email:</Text> {feedbackData.email}
        </p>
        <p>
          <Text strong>Feedback:</Text> {feedbackData.description}
        </p>

        {feedbackData.adminReply && (
          <p>
            <Text strong>Admin Reply:</Text> {feedbackData.adminReply}
          </p>
        )}

        <Button
          type="primary"
          onClick={() => setShowReplyField(!showReplyField)}
          style={{ marginBottom: '20px' }}
          block
        >
          Reply
        </Button>
        
        {showReplyField && (
          <>
            <TextArea
              rows={4}
              value={isReply}
              onChange={(e) => setIsReply(e.target.value)}
              placeholder="Enter your reply here..."
              style={{ marginBottom: '10px' }}
            />
            <Button type="primary" onClick={handleReply} block>
              Save Reply
            </Button>
          </>
        )}

        <Button
          type="default"
          onClick={() => navigate('/ViewFeedback')}
          style={{ marginTop: '20px' }}
          block
        >
          Back to Feedback List
        </Button>
      </Card>
    </div>
  );
};

export default ViewOneFeedback;
