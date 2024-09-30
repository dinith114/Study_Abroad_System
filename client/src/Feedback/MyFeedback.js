import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, List, Button, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;

const MyFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/feedback/feedbacks/${id}`);
      console.log("myfeedbacks", response.data);
      setFeedbacks([response.data]);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleEdit = (feedbackId) => {
    navigate(`/EditFeedbackForm?id=${feedbackId}`);
  };

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/deletefeedbacks/${feedbackId}`);
      handleView(); // Refresh the feedback list after deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <Container>
      <PageTitle title="My Feedback" />

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={feedbacks}
        renderItem={(item) => (
          <List.Item>
            <StyledCard
              title={<CardTitle>{item.name} {item.surname}</CardTitle>}
              actions={[
                <Button
                  key="edit"
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Are you sure to delete this feedback?"
                  onConfirm={() => handleDelete(item._id)}
                >
                  <Button type="primary" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <CardContent>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Admin Reply:</strong> {item.adminReply || 'No reply'}</p>
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </StyledCard>
          </List.Item>
        )}
      />
    </Container>
  );
};

export default MyFeedback;

const Container = styled.div`
  padding: 50px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .ant-card-body {
    padding: 24px;
  }

  .ant-card-actions {
    justify-content: flex-end;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const CardContent = styled.div`
  p {
    margin: 8px 0;
    font-size: 16px;
    color: #555;
  }

  strong {
    color: #333;
  }
`;
