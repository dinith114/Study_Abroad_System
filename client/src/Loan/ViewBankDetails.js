import React from 'react';
import { Modal, Typography } from 'antd';

const { Title, Text } = Typography;

function ViewBankDetails({ bank, isVisible, onClose }) {
  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      {bank && (
        <div className="text-center">
          <img
            alt={bank.bankName}
            src={bank.bankIcon}
            className="h-24 w-auto mb-4 object-contain"
          />
          <Title level={3}>{bank.bankName}</Title>
          <Text>Rank: {bank.rank}</Text><br/>
          <Text>Interest Rate: {bank.interestRate}%</Text><br/>
          <Text>Max Loan: Rs.{bank.maxLoan}.00</Text><br/>
          <Text>Repayment Period: {bank.repaymentPeriod} months</Text><br/>
          <Text>Purpose: {bank.purpose}</Text><br/>
          <Text>Documents Required: {bank.documentsRequired.join(', ')}</Text><br/>
          <Text>Eligible Persons: {bank.eligiblePersons.join(', ')}</Text><br/>
          <Text>Benefits: {bank.benefits.join(', ')}</Text>
        </div>
      )}
    </Modal>
  );
}

export default ViewBankDetails;
