import React , {useState,useEffect}from'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Table, Typography, Space, message } from 'antd';
import { PlusOutlined, UnorderedListOutlined, LineChartOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles (if not already in the project)
import PageTitle from '../Components/PageTitle';

const { Title } = Typography;

const dataSource = [
  {
    key: '1',
    date: '2024-08-24',
    amount: '$1000',
    type: 'Income',
    description: 'Freelance Project',
  },
  {
    key: '2',
    date: '2024-08-22',
    amount: '$500',
    type: 'Expense',
    description: 'Office Supplies',
  },
];

const columns = (onView, onEdit, onDelete) => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: '20%',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '30%',
  },
  {
    title: 'Action',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} type="link" onClick={() => onEdit(record)}>Edit</Button>
        <Button icon={<DeleteOutlined />} type="link" danger onClick={() => onDelete(record)}>Delete</Button>
      </Space>
    ),
  },
];

const TransactionPage = () => {
    const navigate = useNavigate();
    const [financialList,setFinancilaList] = useState([]);
   let list =[];
     
    useEffect(()=>{
        handleView();
    },[])

    const handleView = async() => {
      // Implement your view logic here
      const response = await axios.get("http://localhost:5000/financial/viewfinancials");
      const formattedData = response.data.map(item => {
        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toISOString().split('T')[0]; // Extracts the date part
  
        return {
          key: item._id, // Use _id as key
          date: formattedDate, // Only the date part
          amount: `$${item.amount}`, // Format amount as currency
          type: item.type,
          description: item.description,
        };
      });
  
      console.log("formattedData", formattedData);
      setFinancilaList(formattedData)
    //   list = formattedData
    //   console.log("ccccccc",list)
      console.log("vvvvv",dataSource)
      
    };

    const handleEdit = (record) => {
        console.log("record1",record.key)
        navigate(`/EditTransaction?record=${record.key}`);

    };

    const handleDelete = async(record) => {
        const response = await axios.delete(`http://localhost:5000/financial/deletefinancials/${record.key}`);
        console.log("response",response)
        handleView()
    };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <div style={{ textAlign: 'center' }}>
      <PageTitle title="Company Transactions" />
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ width: '200px', borderRadius: '8px' }}
              onClick={() => navigate('/NewTransaction')}
            >
              Add Transactions
            </Button>
          </Col>
          <Col>
            <Button
              type="dashed"
              icon={<UnorderedListOutlined />}
              size="large"
              style={{ width: '200px', borderRadius: '8px' }}
              onClick={() => navigate('/ViewTransactions')}
            >
              View Transaction List
            </Button>
          </Col>
          <Col>
            <Button
              type="default"
              icon={<LineChartOutlined />}
              size="large"
              style={{ width: '200px', borderRadius: '8px' }}
              onClick={() => navigate('/Dashboard')}
            >
              Profit Summary
            </Button>
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '1500px', margin: '0 auto' }}>
        <Title level={4}>Transactions View</Title>
        <Table
          dataSource={financialList}
          columns={columns(handleView, handleEdit, handleDelete)}
          pagination={false}
          bordered
          size="middle"
          style={{ width: '100%' }} // Adjust the table width
        />
      </div>
    </div>
  );
};

export default TransactionPage;
