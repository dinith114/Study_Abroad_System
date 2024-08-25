import React, { useState } from 'react';
import { Table, Button, Input, Dropdown, Menu } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';

function getStatusColor(status) {
  switch (status) {
    case 'Registered':
      return '#d9d9d9'; // Grey
    case 'Under Review':
      return '#ffeb3b'; // Yellow
    case 'Accepted':
      return '#8bc34a'; // Light Green
    case 'Finalized':
      return '#388e3c'; // Dark Green
    case 'Rejected':
      return '#f44336'; // Red
    default:
      return '#d9d9d9'; // Default Grey
  }
}

function getColumns(handleStatusChange) {
  return [
    {
      title: 'Registration No.',
      dataIndex: 'registrationNo',
      key: 'registrationNo',
      align: 'center',
      render: (text) => <div style={{ backgroundColor: '#f0f5ff', padding: '5px' }}>{text}</div>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Progress Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Dropdown
          overlay={getMenu(handleStatusChange, record.key)}
          trigger={['click']}
        >
          <Button
            style={{
              backgroundColor: getStatusColor(status),
              borderColor: '#dcdcdc',
              fontWeight: 'bold',
              fontSize: '16px',
              height: '40px',
              width: '180px', // Fixed width for consistency
            }}
          >
            {status} <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} style={{ marginRight: '8px' }}>Update</Button>
          <Button icon={<DeleteOutlined />} type="danger" />
        </>
      ),
    },
  ];
}

function getMenu(handleStatusChange, key) {
  return (
    <Menu
      onClick={(e) => handleStatusChange(e, key)}
      items={[
        { key: 'Registered', label: 'Registered' },
        { key: 'Under Review', label: 'Under Review' },
        { key: 'Accepted', label: 'Accepted' },
        { key: 'Finalized', label: 'Finalized' },
        { key: 'Rejected', label: 'Rejected' },
      ]}
    />
  );
}

function getData() {
  return [
    {
      key: '1',
      registrationNo: '001',
      name: 'Jayangi Pamodya Rathnamalala',
      mobile: '0778465000',
      email: 'jayangi123@gmail.com',
      status: 'Under Review',
    },
    {
      key: '2',
      registrationNo: '002',
      name: 'Jayangi Pamodya Rathnamalala',
      mobile: '0778465000',
      email: 'jayangi123@gmail.com',
      status: 'Under Review',
    },
    // Add more student data here...
  ];
}

function StudentList() {
  const [data, setData] = useState(getData());

  const handleStatusChange = (e, key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, status: e.key };
      }
      return item;
    });
    setData(newData);
  };

  const columns = getColumns(handleStatusChange);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary">New Registration</Button>
        <Input
          placeholder="Enter Student ID"
          suffix={<SearchOutlined />}
          style={{ width: '300px' }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{ borderRadius: '8px', overflow: 'hidden' }}
      />
    </div>
  );
}

export default StudentList;
