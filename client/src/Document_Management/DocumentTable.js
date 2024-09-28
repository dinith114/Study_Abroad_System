import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import DocumentHeader from '../Components/DocumentHeader';
import PageTitle from '../Components/PageTitle';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DocumentTable = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [documentData, setDocumentData] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [docDetails, setDocDetails] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    viewDocument();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const viewDocument = async () => {
    try {
      const response = await axios.get("http://localhost:5000/document/viewdocuments");
      if (response.data && response.data.length > 0) {
        setDocumentData(response.data);

        // Extract file names for each document
        const names = response.data.map((doc) => extractFileNameFromUrl(doc.attachments));
        setFileNames(names);
      } else {
        console.error('No documents found in the response.');
      }
    } catch (error) {
      console.error('Error fetching document data:', error);
    }
  };

  const extractFileNameFromUrl = (url) => {
    if (typeof url === 'string') {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
    return 'Unknown File';
  };

  const handleViewDocument = (url) => {
    window.open(url, '_blank');
  };

  const handleRemoveDocument = async (id) => {
    await axios.delete(`http://localhost:5000/document/removeDocuments/${id}`);
    viewDocument();
    setDocumentData(prevData => prevData.filter(doc => doc._id !== id)); // Refresh the document list after deletion
  };

  const handleEditDocument = async (id) => {
    navigate(`/EditDocumentHeader?id=${id}`);
  };

  const openAddDocumentPopup = () => {
    setIsEdit(false);
    setDocDetails({});
    setShowHeader(true);
  };

  const closeDocumentHeader = () => {
    setShowHeader(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    // Set title of the PDF
    doc.text("Document List", 20, 20);

    // Create autoTable for document data
    const tableData = documentData.map((doc, index) => [
      fileNames[index],
      doc.studentName,
      doc.documentType,
      formatDate(doc.createdDate),
    ]);

    doc.autoTable({
      head: [['Document Name', 'Student Name', 'Document Type', 'Date Created']],
      body: tableData,
      startY: 30,
    });

    // Save the PDF
    doc.save('DocumentList.pdf');
  };

  const filteredDocuments = documentData.filter((doc) =>
    doc.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Use filteredDocuments if searchQuery exists, otherwise use documentData
  const documentsToDisplay = searchQuery ? filteredDocuments : documentData;

  return (
    <div>
      <PageTitle title="Document Management" />
      {showHeader && (
        <DocumentHeader
          data={docDetails}
          isEdit={isEdit}
          togglePopup={closeDocumentHeader}
          viewDocument={viewDocument}
        />
      )}
      <TableContainer>
        <HeaderContainer>
          <LeftSection>
            <button onClick={openAddDocumentPopup}>Add New Document</button>
          </LeftSection>
          <RightSection>
            <input
              type="text"
              placeholder="Search by student name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={generatePdf}>Generate PDF</button>
          </RightSection>
        </HeaderContainer>
        <StyledTable>
          <thead>
            <tr>
              <th></th>
              <th>Document Name</th>
              <th>Student Name</th>
              <th>Document Type</th>
              <th>Date Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documentsToDisplay.map((doc, index) => (
              <StyledRow key={doc._id}>
                <td></td>
                <td>{fileNames[index]}</td>
                <td>{doc.studentName}</td>
                <td>
                  <Badge className={doc.documentType.replace(/\s+/g, '-').toLowerCase()}>
                    {doc.documentType}
                  </Badge>
                </td>
                <td>{formatDate(doc.createdDate)}</td>
                <td className="icons">
                  <FiEdit onClick={() => handleEditDocument(doc._id)} />
                  <FiEye title="View Document" onClick={() => handleViewDocument(doc.attachments)} />
                  <FiTrash2 title="Delete Document" onClick={() => handleRemoveDocument(doc._id)} />
                </td>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export default DocumentTable;

const TableContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #e0e0e0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      background-color: #218838;
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f1f3f5;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
  }

  td {
    font-size: 16px;
    color: #495057;
  }

  .icons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

const StyledRow = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: white;
  display: inline-block;

  &.english-requirement {
    background-color: #f5a623;
  }

  &.resume {
    background-color: #bc9cff;
  }

  &.birth-certificate {
    background-color: #7cd2c9;
  }
`;