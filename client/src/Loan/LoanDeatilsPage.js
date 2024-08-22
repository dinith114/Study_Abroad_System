import React from 'react';
import LoanDetails from './LoanDetails';

function LoanDetailsPage() {
  const application = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, Cityville',
    email: 'john.doe@example.com',
    phoneNumber: '071 234 5678',
    gender: 'Male',
    dateOfBirth: '2000-01-01',
    nic: '123456789V',
    university: 'University of Example',
    program: 'Bachelor of Science',
    programFee: '500000',
    scholarshipAmount: '100000',
    totalProgramFee: '500000',
    totalLoanAmount: '400000',
    selectedBank: 'Bank of Ceylon'
  };

  return <LoanDetails application={application} />;
}

export default LoanDetailsPage;
