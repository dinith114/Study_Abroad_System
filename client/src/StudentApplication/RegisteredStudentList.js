import React from 'react';
import { Table } from 'antd';

function RegisteredStudentList({ students }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
      title: 'Highest Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
    },
    {
      title: 'Preferred Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Table
        columns={columns}
        dataSource={students}
        pagination={false}
        bordered
        style={{ width: '1000px', border: '1px solid #000000' }} // Set width and border color here
        rowClassName="custom-row"
      />
    </div>
  );
}

export default RegisteredStudentList;
