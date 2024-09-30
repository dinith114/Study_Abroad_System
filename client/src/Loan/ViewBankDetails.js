import React from 'react';
import { Modal, Typography } from 'antd';
import { FaMoneyBillWave, FaPercentage, FaCalendarAlt, FaCheck, FaFileAlt, FaUsers } from 'react-icons/fa';

const { Title, Text } = Typography;

const BASE_URL = 'http://localhost:5000'; // Define BASE_URL here

function ViewBankDetails({ bank, isVisible, onClose }) {
  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      style={{ padding: '16px', borderRadius: '8px' }}
    >
      {bank && (
        <div className="text-center">
          {/* Bank Name */}
          <Title level={3} className="text-xl text-gray-800 mb-4">{bank.bankName}</Title>

          {/* Bank Icon */}
          <div className="flex justify-center items-center mb-4">
            <img
              alt={bank.bankName}
              src={`${BASE_URL}${bank.bankIcon}`}
              className="h-24 w-auto object-contain rounded-md shadow-md border border-gray-300 p-2 bg-white"
            />
          </div>

          {/* Bank Details */}
          <div className="text-left space-y-4">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-green-600 mr-2" />
              <Text className="text-lg font-semibold">Rank:</Text> 
              <Text className="ml-2">{bank.rank}</Text>
            </div>
            
            <div className="flex items-center">
              <FaPercentage className="text-blue-600 mr-2" />
              <Text className="text-lg font-semibold">Interest Rate:</Text> 
              <Text className="ml-2">{bank.interestRate}%</Text>
            </div>

            <div className="flex items-center">
              <FaMoneyBillWave className="text-yellow-600 mr-2" />
              <Text className="text-lg font-semibold">Max Loan:</Text> 
              <Text className="ml-2">Rs.{bank.maxLoan}.00</Text>
            </div>

            <div className="flex items-center">
              <FaCalendarAlt className="text-purple-600 mr-2" />
              <Text className="text-lg font-semibold">Repayment Period:</Text> 
              <Text className="ml-2">{bank.repaymentPeriod} months</Text>
            </div>

            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <Text className="text-lg font-semibold">Purpose:</Text> 
              <Text className="ml-2">{bank.purpose}</Text>
            </div>

            <div className="flex items-center">
              <FaFileAlt className="text-blue-400 mr-2" />
              <Text className="text-lg font-semibold">Documents Required:</Text> 
              <Text className="ml-2">{bank.documentsRequired.join(', ')}</Text>
            </div>

            <div className="flex items-center">
              <FaUsers className="text-red-500 mr-2" />
              <Text className="text-lg font-semibold">Eligible Persons:</Text> 
              <Text className="ml-2">{bank.eligiblePersons.join(', ')}</Text>
            </div>

            <div className="flex items-center">
              <FaCheck className="text-teal-600 mr-2" />
              <Text className="text-lg font-semibold">Benefits:</Text> 
              <Text className="ml-2">{bank.benefits.join(', ')}</Text>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ViewBankDetails;
