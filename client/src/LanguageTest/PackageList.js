import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PageTitle from '../Components/PageTitle';

const PackageList = () => {
  const [viewList, setViewList] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Package Name',
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record._id)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} danger />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    let response = await axios.get(`http://localhost:5000/languagePrep/viewpackage`);
    setViewList(response.data);
  };

  const handleEdit = async (key) => {
    navigate(`/EditPackage?id=${key}`);
  };

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:5000/languagePrep/deletepackage/${id}`);
      if (response.status === 200) {
        handleView();
      } else {
        console.error('Error deleting package:', response);
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/RequestsTable');
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <PageTitle title="Language Package List" />

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          onClick={handleNavigate}
        >
          View Requests
        </Button>
      </div>

      <div style={{ textAlign: 'left', maxWidth: '1500px', margin: '0 auto' }}>
        <Table dataSource={viewList} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default PackageList;
