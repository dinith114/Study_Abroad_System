import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoanDetails from './LoanDetails';
import axios from 'axios';

function LoanDetailsPage() {
  const { id } = useParams(); // Get ID from URL
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/loan-applications/view/${id}`);
        setApplication(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!application) return <div>No application found</div>;

  return <LoanDetails application={application} />;
}

export default LoanDetailsPage;
