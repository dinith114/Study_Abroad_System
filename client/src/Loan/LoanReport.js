// LoanReport.js
import React from 'react';

const LoanReport = ({ loanApplications }) => {
  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Global Reach</h1>
        <h2>Loan Applications Report</h2>
      </header>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Bank</th>
            <th>Loan Amount</th>
            <th>University</th>
            <th>Program</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loanApplications.map((row) => (
            <tr key={row._id}>
              <td>{row.firstName} {row.lastName}</td>
              <td>{row.selectedBank}</td>
              <td>{row.totalLoanAmount}</td>
              <td>{row.university}</td>
              <td>{row.program}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanReport;
