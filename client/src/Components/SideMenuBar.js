import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, FileTextOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

function SideMenuBar() {
  const navigate = useNavigate();

  return (
    
    <Sider width={300} style={{ height: '500px', position: 'fixed', left: 0, background: '#cce3fc', padding: '10px',
        marginLeft: '30px', marginTop: '50px', border: "1px solid #afd5fc", borderRadius: '10px', boxShadow: "1px 2px 2px #464e56"}}>
      {/* <div className="logo" style={{ height: '100px', margin: '16px', background: 'black' }} /> */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0, padding: '20px', background: '#cce3fc', }}
        onClick={({ key }) => {
          if (key === "1") {
            navigate('/addStudent');
          } else if (key === "2") {
            navigate('./registeredStudentList');
          } else if (key === "3") {
            navigate('/studentList');
          }
        }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <b> Student Registration</b>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <b> Student Registration</b>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined />}>
          View Student Application
        </Menu.Item>
      </Menu>
    </Sider>
    
  );
}

export default SideMenuBar;
