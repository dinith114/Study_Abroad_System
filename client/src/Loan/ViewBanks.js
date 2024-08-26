import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Input, Typography, Modal } from 'antd'; // Ensure Modal is imported from 'antd'
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons/fa
import { AiOutlinePlus } from 'react-icons/ai'; // Import AiOutlinePlus from react-icons/ai
import PageTitle from '../Components/PageTitle';
import axios from 'axios';
import ViewBankDetails from './ViewBankDetails'; // Import the ViewBankDetails component

const { Title } = Typography;
const { confirm } = Modal; // Use Modal from Ant Design

function ViewBanks() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch banks from the API
    axios.get('http://localhost:5000/banks/list')
      .then(response => {
        setBanks(response.data);
      })
      .catch(error => {
        console.error('Error fetching banks:', error);
      });
  }, []);

  const handleViewClick = (bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBank(null); // Clear the selected bank
  };

  const handleEditClick = (bankId) => {
    navigate(`/bank-edit/${bankId}`); // Navigate to the edit page
  };

  const handleAddNewBankClick = () => {
    navigate('/bank-add');
  };

  const handleApplicationListClick = () => {
    navigate('/loan-app-list');
  };

  const handleDeleteClick = (id) => {
    confirm({
      title: 'Are you sure you want to delete this bank?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        axios.delete(`http://localhost:5000/banks/delete/${id}`)
          .then(() => {
            setBanks(banks.filter(bank => bank._id !== id)); // Refresh the list after deletion
          })
          .catch(error => {
            console.error('Error deleting bank:', error);
          });
      },
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PageTitle title="Manage Banks" />

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Available Banks</Title>

          <div className="flex space-x-4">
            <Input
              placeholder="Search banks"
              prefix={<FaSearch className="text-gray-500" />}
              className="w-64"
            />

            <Button
              type="primary"
              icon={<AiOutlinePlus />}
              onClick={handleAddNewBankClick}
              className="flex items-center space-x-2"
            >
              <span>Add new bank</span>
            </Button>

            <Button
              type="primary"
              style={{ backgroundColor: 'green', borderColor: 'green' }}
              onClick={handleApplicationListClick}
              className="flex items-center space-x-2"
            >
              <span>Application List</span>
            </Button>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          {banks.map((bank) => (
            <Col key={bank._id} xs={24} sm={12} md={8} lg={6}>
              <Card className="flex flex-col items-center text-center shadow-md">
                <div className="flex justify-center py-4">
                  <img
                    alt={bank.bankName}
                    src={bank.bankIcon}
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="py-4">
                  <Title level={4} className="mb-1">{bank.bankName}</Title>
                  <p className="text-gray-500">Rank: {bank.rank}</p>
                  <p className="text-gray-500">Interest Rate: {bank.interestRate}%</p>
                  <p className="text-gray-500">Max Loan: Rs.{bank.maxLoan}.00</p>
                  <p className="text-gray-500">Repayment Period: {bank.repaymentPeriod} months</p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Button
                    type="link"
                    icon={<FaEdit />}
                    onClick={() => handleEditClick(bank._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    icon={<FaEye />}
                    onClick={() => handleViewClick(bank)}
                  >
                    View
                  </Button>
                  <Button
                    type="default"
                    danger
                    icon={<FaTrash />}
                    onClick={() => handleDeleteClick(bank._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal for bank details */}
      <ViewBankDetails
        bank={selectedBank}
        isVisible={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default ViewBanks;
