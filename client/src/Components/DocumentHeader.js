import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { AiOutlineUpload } from 'react-icons/ai';
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs';
import { RiAddCircleFill } from 'react-icons/ri';

const DocumentHeader = ({ data, togglePopup, viewDocument }) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    documentType: data.documentType || '',
    studentName: data.studentName || '',
    attachments: data.attachments || ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validation: Only allow letters and spaces in the student name
    if (name === 'studentName' && /[^a-zA-Z\s]/.test(value)) {
      setError('Student name can only contain letters and spaces.');
      return;
    } else {
      setError(''); // Clear error if validation passes
    }
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Validation: Only allow PDF files
    if (file && !file.type.includes('pdf')) {
      setError('Only PDF files are allowed.');
      return;
    } else {
      setError(''); // Clear error if validation passes
    }

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUploadedFile(fileURL);

      setFormFields(prevFields => ({
        ...prevFields,
        attachments: file
      }));
    }
  };

  const handleSubmit = async () => {
    // Additional validation checks
    if (!formFields.documentType || !formFields.studentName || !formFields.attachments) {
      setError('All fields are required.');
      return;
    }

    console.log("formFields", formFields);
    const formData = new FormData();

    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }

    const response = await axios.post("http://localhost:5000/document/documentCreate", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    viewDocument();
    console.log("response", response);
    togglePopup(); // Close the popup after submission
  };

  return (
    <PopupOverlay>
      <Popup>
        <PopupHeader>
          <h2>Select Document</h2>
          <CloseButton onClick={togglePopup}>
            <FiX size={24} />
          </CloseButton>
        </PopupHeader>
        <PopupBody>
          <FileUpload>
            <UploadIcon>
              <AiOutlineUpload size={50} />
            </UploadIcon>
            <p>Drag and drop your file</p>
            <input
              type="file"
              id="attachments"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <SelectFileButton onClick={() => document.getElementById('attachments').click()}>
              <BsFillFileEarmarkPlusFill size={20} />
              Select File
            </SelectFileButton>
            {uploadedFile && <FilePreview src={uploadedFile} alt="Uploaded file preview" />}
          </FileUpload>
          <DocumentDetails>
            <label>Select Document Type</label>
            <select
              name="documentType"
              value={formFields.documentType}
              onChange={handleInputChange}
              className="document-type"
            >
              <option value="">Select Options</option>
              <option value="English Requirement">IELTS Document</option>
              <option value="English Requirement">PTE Document</option>
              <option value="Resume">Resume</option>
              <option value="Birth Certificate">Birth Certificate</option>
            </select>
            <label>Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formFields.studentName}
              onChange={handleInputChange}
              className="student-name"
            />
          </DocumentDetails>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </PopupBody>
        <PopupFooter>
          <CancelButton onClick={togglePopup}>
            <FiX size={20} />
            Cancel
          </CancelButton>
          <AddButton onClick={handleSubmit}>
            <RiAddCircleFill size={20} />
            Add
          </AddButton>
        </PopupFooter>
      </Popup>
    </PopupOverlay>
  );
};

export default DocumentHeader;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  position: relative;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PopupFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FileUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const UploadIcon = styled.div`
  color: #aaa;
`;

const SelectFileButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const FilePreview = styled.img`
  margin-top: 10px;
  max-width: 100%;
  height: auto;
  border-radius: 5px;
`;

const DocumentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: bold;
  }

  .document-type,
  .student-name {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const CancelButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #d9363e;
  }
`;

const AddButton = styled.button`
  background-color: #52c41a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #389e0d;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;
