import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Dropdown, Menu } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, DownOutlined, EllipsisOutlined, InfoCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";


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

function getColumns(handleStatusChange, handleMenuClick, handleEdit) {
  return [
    // {
    //   title: 'Registration No.',
    //   dataIndex: 'registrationNo',
    //   key: 'registrationNo',
    //   align: 'center',
    //   render: (text) => <div style={{ backgroundColor: '#f0f5ff', padding: '5px' }}>{text}</div>,
    // },
    {
      title: 'Name',
      dataIndex: 'studentFullName',
      key: 'name',
    },
    {
      title: 'Mobile',
      dataIndex: 'phoneNumber',
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
          overlay={getStatusMenu(handleStatusChange, record._id)}
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button icon={<EditOutlined />} style={{ marginRight: '8px' }} onClick={() => handleEdit(record._id)}>Update</Button>
          <Button icon={<DeleteOutlined />} type="danger" style={{ marginRight: '8px' }}  />
          <Dropdown
            overlay={getActionMenu(handleMenuClick)}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </div>
      ),
    },
  ];
}

function getStatusMenu(handleStatusChange, key) {
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

function getActionMenu(handleMenuClick) {
  return (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="view" icon={<InfoCircleOutlined />} style={{ color: 'blue' }} >
        View
      </Menu.Item>
      <Menu.Item key="update" icon={<EditOutlined />} style={{ color: 'blue' }} >
        Update
      </Menu.Item>
      <Menu.Item key="sendEmail" icon={<MailOutlined />} style={{ color: 'blue' }}>
        Send Email
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} style={{ color: 'red' }}>
        Delete
      </Menu.Item>
    </Menu>
  );
}

function StudentList() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    viewStudentApplication();
  }, []);

  const viewStudentApplication = async () => {
    let response = await axios.get(
      `http://localhost:5000/studentapp/viewStudentApplication`
    );
    console.log("response", response.data);
    setStudentList(response.data);
  };

  const handleStatusChange = (e, key) => {
    const newData = studentList.map((item) => {
      if (item._id === key) {
        return { ...item, status: e.key };
      }
      return item;
    });
    setStudentList(newData);
  };

  // const handleStatusChange = async (e, key) => {
  //   try {
  //     console.log(`Updating status for ID: ${key} to ${e.key}`);
  
  //     const response = await axios.put(
  //       `http://localhost:5000/studentapp/updateStatus/${key}`,
  //       { status: e.key }
  //     );
  
  //     if (response.status === 200) {
  //       const newData = studentList.map((item) => {
  //         if (item._id === key) {
  //           return { ...item, status: e.key };
  //         }
  //         return item;
  //       });
  //       setStudentList(newData);
  //       console.log('Status updated successfully');
  //     } else {
  //       console.error('Failed to update status');
  //     }
  //   } catch (error) {
  //     console.error('Error updating status:', error.response ? error.response.data : error.message);
  //   }
 // };
  

  const handleMenuClick = (id) => {
    if (id.key === 'view') {
      navigate(`/studentProfile?id=${id}`);
    }
    // Add more actions based on e.key if needed
    console.log(id.key);
  };

  const handleEdit = (id) => {
    navigate(`/editStudent?id=${id}`);
  };

  

//  /*  const handleDelete = (id) => {
//     navigate(`/editStudent?id=${id}`);
//   }; */

  const columns = getColumns(handleStatusChange, handleMenuClick, handleEdit);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={() => navigate("/addStudent")}>New Registration</Button>
        <Input
          placeholder="Enter Student ID"
          suffix={<SearchOutlined />}
          style={{ width: '300px' }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={studentList}
        pagination={false}
        bordered
        style={{ borderRadius: '8px', overflow: 'hidden' }}
      />
    </div>
  );
}

export default StudentList;
