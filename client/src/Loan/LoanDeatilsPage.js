import React from 'react';
import { useParams } from 'react-router-dom';
import LoanDetails from './LoanDetails';

function LoanDetailsPage() {

  const { id } = useParams();

  const application = {
    id,
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
    registrationFees: '100000',
    totalProgramFee: '500000',
    totalLoanAmount: '400000',
    selectedBank: 'Bank of Ceylon'
  };

  return <LoanDetails application={application} />;
}

export default LoanDetailsPage;
