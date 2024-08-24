import React from 'react';
import { Table, Button, Input } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const StudentList = () => {
  const columns = [
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
      render: (status) => (
        <Button style={{ backgroundColor: '#f5f5dc', borderColor: '#dcdcdc' }}>{status}</Button>
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

  const data = [
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
};

export default StudentList;


